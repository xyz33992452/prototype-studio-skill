(() => {
  const requirementsApi = window.prototypeStudioRequirements;

  function formatDate(dateValue) {
    const date = new Date(dateValue);
    return Number.isNaN(date.getTime())
      ? dateValue
      : date.toLocaleString("zh-CN", { hour12: false });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function renderList(items) {
    if (!items || items.length === 0) {
      return '<li class="text-sm text-slate-500">暂无</li>';
    }

    return items
      .map((item) => `<li class="text-sm leading-6 text-slate-700">${escapeHtml(item)}</li>`)
      .join("");
  }

  function renderDefinitionList(items) {
    if (!items || items.length === 0) {
      return '<p class="text-sm text-slate-500">暂无</p>';
    }

    return items
      .map(
        (item) => `
          <div class="rounded-2xl border border-slate-200 p-4">
            <p class="text-sm font-semibold text-slate-900">${escapeHtml(item.label || item.name || "未命名字段")}</p>
            <p class="mt-1 text-xs text-slate-500">${escapeHtml(item.name || "")}${item.type ? ` · ${escapeHtml(item.type)}` : ""}${item.format ? ` · ${escapeHtml(item.format)}` : ""}</p>
            ${item.description ? `<p class="mt-2 text-sm leading-6 text-slate-700">${escapeHtml(item.description)}</p>` : ""}
            ${item.source ? `<p class="mt-2 text-xs text-slate-500">来源：${escapeHtml(item.source)}</p>` : ""}
          </div>
        `
      )
      .join("");
  }

  function renderRuleCards(items, valueRenderer) {
    if (!items || items.length === 0) {
      return '<p class="text-sm text-slate-500">暂无</p>';
    }

    return items
      .map((item) => {
        const title = typeof item === "string" ? item : item.name || item.scenario || item.field || "规则项";
        const body = valueRenderer(item);
        return `
          <div class="rounded-2xl border border-slate-200 p-4">
            <p class="text-sm font-semibold text-slate-900">${escapeHtml(title)}</p>
            <div class="mt-2 text-sm leading-6 text-slate-700">${body}</div>
          </div>
        `;
      })
      .join("");
  }

  function buildDownloadContent(requirementDocument) {
    const header = [
      requirementDocument.title,
      `版本：${requirementDocument.version}`,
      `更新时间：${formatDate(requirementDocument.updatedAt)}`,
      `更新人：${requirementDocument.updatedBy}`,
      "",
    ].join("\n");

    const sections = requirementDocument.sections
      .map((section) =>
        [
          `## ${section.pageTitle} (${section.sectionId})`,
          `摘要：${section.summary}`,
          `页面目标：${section.pageGoal}`,
          `主要模块：${section.mainModules.join("、")}`,
          `关键交互：${section.keyInteractions.join("、")}`,
          `交互说明：${(section.interactionDetails || []).join("；")}`,
          `业务规则：${(section.businessRules || []).join("；")}`,
          `数据规则：${(section.dataRules || []).join("；")}`,
          `前置条件：${(section.preconditions || []).join("；")}`,
          `排序规则：${(section.sortingRules || []).join("；")}`,
          `边界情况：${(section.edgeCases || []).join("；")}`,
          `异常处理：${(section.exceptionHandling || []).map((item) => `${item.scenario} -> ${item.handling}`).join("；")}`,
          `未决问题：${(section.unresolvedQuestions || []).join("；")}`,
          "",
        ].join("\n")
      )
      .join("\n");

    return `${header}${sections}`;
  }

  function attachRequirementsOverlay({ pageId, requirementDocument, initialSectionId }) {
    const root = document.querySelector("#requirements-overlay-root");
    if (!root) {
      return;
    }

    const editable = requirementsApi.canEditRequirements();
    const downloadable = requirementsApi.canDownloadRequirements();
    let activeSectionId = initialSectionId || requirementDocument.sections[0]?.sectionId;
    let draftDocument = JSON.parse(JSON.stringify(requirementDocument));

    function downloadRequirements() {
      const content = buildDownloadContent(draftDocument);
      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "prototype-requirements.md";
      link.click();
      URL.revokeObjectURL(link.href);
    }

    function renderOverlay() {
      const sectionsMarkup = draftDocument.sections
        .map((section) => {
          const activeClass =
            section.sectionId === activeSectionId ? "requirements-section--active" : "";
          const editorMarkup = editable
            ? `
              <label class="mt-4 block text-xs uppercase tracking-[0.25em] text-slate-400">编辑摘要</label>
              <textarea
                data-section-summary="${section.sectionId}"
                class="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-500"
              >${escapeHtml(section.summary)}</textarea>
            `
            : "";

          return `
            <section id="${section.sectionId}" class="requirements-section ${activeClass} rounded-[1.75rem] border border-slate-200 p-5 transition">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p class="text-xs uppercase tracking-[0.3em] text-slate-400">${escapeHtml(section.pageModeLabel || section.pageMode)}</p>
                  <h3 class="mt-2 text-xl font-semibold text-slate-900">${escapeHtml(section.pageTitle)}</h3>
                  <p class="mt-2 text-sm text-slate-600">${escapeHtml(section.pageGoal)}</p>
                </div>
                <div class="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">页面标识：${escapeHtml(section.routeKey || section.pageId)}</div>
              </div>
              <div class="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">摘要</p>
                  <p class="mt-2 text-sm leading-6 text-slate-700">${escapeHtml(section.summary)}</p>
                  ${editorMarkup}
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">主要模块</p>
                  <ul class="mt-2 list-disc space-y-1 pl-5">${renderList(section.mainModules)}</ul>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">关键交互</p>
                  <ul class="mt-2 list-disc space-y-1 pl-5">${renderList(section.keyInteractions)}</ul>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">交互说明</p>
                  <ul class="mt-2 list-disc space-y-1 pl-5">${renderList(section.interactionDetails)}</ul>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">业务与数据规则</p>
                  <ul class="mt-2 list-disc space-y-1 pl-5">${renderList([
                    ...(section.businessRules || []),
                    ...(section.dataRules || []),
                  ])}</ul>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">前置条件</p>
                  <ul class="mt-2 list-disc space-y-1 pl-5">${renderList(section.preconditions)}</ul>
                </div>
              </div>
              <div class="mt-5 grid gap-5 xl:grid-cols-2">
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">数据定义</p>
                  <div class="mt-2 space-y-3">${renderDefinitionList(section.dataDefinitions)}</div>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">计算逻辑</p>
                  <div class="mt-2 space-y-3">${renderRuleCards(section.calculationLogic, (item) => `
                    ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
                    ${item.formula ? `<p class="mt-2 text-xs text-slate-500">公式：${escapeHtml(item.formula)}</p>` : ""}
                  `)}</div>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">类型与长度限制</p>
                  <div class="mt-2 space-y-3">${renderRuleCards(section.fieldConstraints, (item) => `
                    <p>类型：${escapeHtml(item.type || "未定义")}</p>
                    ${item.maxLength ? `<p>最大长度：${escapeHtml(item.maxLength)}</p>` : ""}
                    ${item.required !== undefined ? `<p>是否必填：${item.required ? "是" : "否"}</p>` : ""}
                    ${item.format ? `<p>格式：${escapeHtml(item.format)}</p>` : ""}
                    ${item.notes ? `<p class="mt-2 text-xs text-slate-500">${escapeHtml(item.notes)}</p>` : ""}
                  `)}</div>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">排序与分页</p>
                  <div class="rounded-2xl border border-slate-200 p-4">
                    <p class="text-sm font-semibold text-slate-900">排序规则</p>
                    <ul class="mt-2 list-disc space-y-1 pl-5">${renderList(section.sortingRules)}</ul>
                    <p class="mt-4 text-sm font-semibold text-slate-900">分页设置</p>
                    ${section.pagination ? `
                      <p class="mt-2 text-sm leading-6 text-slate-700">默认每页 ${escapeHtml(section.pagination.pageSize || "未定义")} 条${section.pagination.pageSizeOptions ? `，可选 ${escapeHtml(section.pagination.pageSizeOptions.join(" / "))} 条` : ""}。</p>
                      ${section.pagination.notes ? `<p class="mt-2 text-xs text-slate-500">${escapeHtml(section.pagination.notes)}</p>` : ""}
                    ` : '<p class="mt-2 text-sm text-slate-500">暂无</p>'}
                  </div>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">表单字段</p>
                  <div class="mt-2 space-y-3">${renderRuleCards(section.formFields, (item) => `
                    <p>控件：${escapeHtml(item.control || "未定义")}</p>
                    ${item.required !== undefined ? `<p>是否必填：${item.required ? "是" : "否"}</p>` : ""}
                    ${item.placeholder ? `<p>占位：${escapeHtml(item.placeholder)}</p>` : ""}
                    ${item.options ? `<p>选项：${escapeHtml(item.options.join(" / "))}</p>` : ""}
                    ${item.notes ? `<p class="mt-2 text-xs text-slate-500">${escapeHtml(item.notes)}</p>` : ""}
                  `)}</div>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">异常处理</p>
                  <div class="mt-2 space-y-3">${renderRuleCards(section.exceptionHandling, (item) => `
                    <p>${escapeHtml(item.handling || "")}</p>
                  `)}</div>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">边界情况</p>
                  <ul class="mt-2 list-disc space-y-1 pl-5">${renderList(section.edgeCases)}</ul>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.25em] text-slate-400">未决问题</p>
                  <ul class="mt-2 list-disc space-y-1 pl-5">${renderList(section.unresolvedQuestions)}</ul>
                </div>
              </div>
            </section>
          `;
        })
        .join("");

      root.innerHTML = `
        <button type="button" class="requirements-fab" id="requirements-fab">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-slate-950">R</span>
          <span class="text-sm font-medium">查看需求</span>
        </button>
        <div class="requirements-shell hidden" id="requirements-shell">
          <div class="requirements-panel">
            <header class="border-b border-slate-200 px-6 py-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.3em] text-slate-400">共享需求文档</p>
                  <h2 class="mt-2 text-2xl font-semibold text-slate-900">${escapeHtml(draftDocument.title)}</h2>
                  <p class="mt-2 text-sm text-slate-500">版本 ${escapeHtml(draftDocument.version)} · 更新时间 ${formatDate(draftDocument.updatedAt)} · 更新人 ${escapeHtml(draftDocument.updatedBy)}</p>
                </div>
                <button id="close-requirements" type="button" aria-label="关闭需求文档面板" class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">关闭</button>
              </div>
              <div class="mt-5 flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">当前页面：${escapeHtml(pageId)}</span>
                <span class="rounded-full bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700">${editable ? "作者/可编辑" : "查看者/只读"}</span>
                ${downloadable ? '<button id="download-requirements" type="button" class="requirements-download-link">下载 MD</button>' : ""}
                ${editable ? '<button id="save-requirements" type="button" class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">保存修改</button>' : ""}
              </div>
            </header>

            <div class="flex-1 overflow-y-auto px-6 py-6">
              <nav class="mb-6 flex flex-wrap gap-2">
                ${draftDocument.sections
                  .map(
                    (section) => `
                      <button
                        type="button"
                        class="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
                        data-jump-section="${section.sectionId}"
                      >
                        ${escapeHtml(section.pageTitle)}
                      </button>
                    `
                  )
                  .join("")}
              </nav>
              <div class="space-y-4">${sectionsMarkup}</div>
            </div>
          </div>
        </div>
      `;

      const shell = root.querySelector("#requirements-shell");
      const fab = root.querySelector("#requirements-fab");
      const closeOverlay = () => {
        shell.classList.add("hidden");
      };

      fab.addEventListener("click", () => {
        shell.classList.remove("hidden");
        const targetSection = root.querySelector(`#${activeSectionId}`);
        if (targetSection instanceof HTMLElement) {
          targetSection.scrollIntoView({ block: "start", behavior: "smooth" });
        }
      });

      root.querySelector("#close-requirements").addEventListener("click", closeOverlay);

      shell.addEventListener("click", (event) => {
        if (event.target === shell) {
          closeOverlay();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !shell.classList.contains("hidden")) {
          closeOverlay();
        }
      });

      root.querySelectorAll("[data-jump-section]").forEach((button) => {
        button.addEventListener("click", () => {
          const sectionId = button.getAttribute("data-jump-section");
          if (!sectionId) {
            return;
          }

          activeSectionId = sectionId;
          renderOverlay();

          const targetSection = root.querySelector(`#${sectionId}`);
          if (targetSection instanceof HTMLElement) {
            targetSection.scrollIntoView({ block: "start", behavior: "smooth" });
          }

          root.querySelector("#requirements-shell").classList.remove("hidden");
        });
      });

      if (downloadable) {
        root.querySelector("#download-requirements").addEventListener("click", downloadRequirements);
      }

      if (editable) {
        root.querySelectorAll("[data-section-summary]").forEach((textarea) => {
          textarea.addEventListener("input", () => {
            const sectionId = textarea.getAttribute("data-section-summary");
            const section = draftDocument.sections.find((item) => item.sectionId === sectionId);
            if (section) {
              const nextValue = textarea.value.trim();
              if (nextValue) {
                section.summary = nextValue;
              }
            }
          });
        });

        root.querySelector("#save-requirements").addEventListener("click", () => {
          draftDocument.updatedAt = new Date().toISOString();
          draftDocument.updatedBy = "current-author";
          window.alert("示例模式：共享需求文档已保存。");
          renderOverlay();
          root.querySelector("#requirements-shell").classList.remove("hidden");
        });
      }
    }

    renderOverlay();
  }

  window.prototypeStudioRequirementsUi = {
    attachRequirementsOverlay,
  };
})();
