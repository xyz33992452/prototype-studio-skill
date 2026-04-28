(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const role = searchParams.get("role") || "viewer";

  const requirementDocument = {
    documentId: "prototype-requirements",
    title: "CRM 原型需求说明",
    version: "0.2.0",
    updatedAt: "2026-04-28T04:20:00Z",
    updatedBy: "prototype-author",
    permissions: {
      authorIds: ["author"],
      editorIds: ["editor"],
      viewerMode: "view-download",
    },
    sections: [
      {
        sectionId: "req-customer-list",
        pageId: "page-customer-list",
        pageTitle: "客户列表",
        pageMode: "list-page",
        pageModeLabel: "列表页",
        routeKey: "customer-list",
        route: "./customer-list.html",
        fileName: "customer-list.html",
        summary: "用于浏览、筛选和管理客户记录。",
        pageGoal: "帮助销售运营快速定位客户、判断当前状态，并进入详情页继续处理。",
        targetUsers: ["sales-ops", "customer-success-manager"],
        mainModules: ["顶部指标概览", "筛选与搜索区", "主操作区", "客户列表表格"],
        keyInteractions: ["按名称搜索", "按状态和负责人筛选", "从列表进入详情页", "删除前二次确认"],
        interactionDetails: [
          "在搜索框按 Enter 与点击“查询”按钮效果一致。",
          "点击客户名称或“查看”按钮进入详情页，并保留当前角色参数。",
          "点击“删除”先弹出确认框，示例中仅模拟删除流程，不真正修改数据。"
        ],
        businessRules: ["流失风险客户需要优先显示提醒", "删除客户前必须二次确认"],
        dataRules: ["列表使用共享示例数据", "最近跟进信息需要始终可见"],
        dataDefinitions: [
          {
            name: "customerId",
            label: "客户编号",
            description: "客户的稳定业务主键，用于列表展示和详情跳转。",
            type: "string",
            format: "C-2001",
            source: "prototypeStudioCustomerStore"
          },
          {
            name: "followUp",
            label: "最近跟进日期",
            description: "用于筛选和列表默认排序。",
            type: "date",
            format: "YYYY-MM-DD",
            source: "prototypeStudioCustomerStore"
          }
        ],
        calculationLogic: [
          {
            name: "riskPriority",
            description: "默认队列中，流失风险客户优先级高于待跟进和活跃客户。",
            formula: "risk > follow > active"
          },
          {
            name: "topSummaryCards",
            description: "顶部概览卡片为示例指标，不与列表实时联动。",
            formula: "static demo metrics"
          }
        ],
        preconditions: [
          "当前用户需要拥有客户列表查看权限才能访问页面。",
          "进入客户详情前，客户记录必须存在且 customerId 有效。"
        ],
        fieldConstraints: [
          {
            field: "customer-search",
            label: "客户名称",
            type: "string",
            maxLength: 50,
            required: false,
            notes: "支持客户名称或客户编号关键词搜索。"
          },
          {
            field: "customer-followup-filter",
            label: "最近跟进",
            type: "date",
            required: false,
            notes: "用于精确匹配日期，不支持日期区间。"
          }
        ],
        sortingRules: [
          "默认按最近跟进日期倒序展示。",
          "当最近跟进日期相同时，流失风险客户排在前面。"
        ],
        pagination: {
          enabled: true,
          pageSize: 20,
          pageSizeOptions: [20, 50, 100],
          notes: "示例页当前未实现真实翻页，但需求说明保留分页基线。"
        },
        formFields: [
          {
            field: "customer-search",
            label: "客户名称",
            control: "text",
            required: false,
            placeholder: "请输入客户名称或编号"
          },
          {
            field: "customer-status-filter",
            label: "客户状态",
            control: "select",
            required: false,
            options: ["全部状态", "活跃", "待跟进", "流失风险"]
          }
        ],
        exceptionHandling: [
          {
            scenario: "筛选无结果",
            handling: "显示空状态提示，并提供重置筛选入口。"
          },
          {
            scenario: "无删除权限",
            handling: "仅展示查看入口，不展示删除动作。"
          }
        ],
        edgeCases: ["筛选后无结果", "无删除权限的用户仅显示查看操作"],
        unresolvedQuestions: ["是否支持批量删除", "是否需要保存筛选器"],
        notes: ["列表应体现 B 端后台页面的信息密度，同时保留足够留白。"],
      },
      {
        sectionId: "req-customer-detail",
        pageId: "page-customer-detail",
        pageTitle: "客户详情",
        pageMode: "detail-page",
        pageModeLabel: "详情页",
        routeKey: "customer-detail",
        route: "./customer-detail.html",
        fileName: "customer-detail.html",
        summary: "用于查看单个客户的业务概况、关键联系人和跟进进度。",
        pageGoal: "帮助客户经理快速理解客户现状，并定位下一步需要推进的事项。",
        targetUsers: ["account-manager", "sales-director"],
        mainModules: ["头部状态区", "客户概览卡片", "业务信息区", "关键联系人区", "跟进时间线"],
        keyInteractions: ["编辑客户信息", "发起商机", "新增跟进记录", "打开需求章节"],
        interactionDetails: [
          "查看者角色隐藏“编辑信息”按钮，编辑者角色保留该入口。",
          "点击返回链接回到客户列表，并保留当前角色参数。",
          "需求按钮默认定位到当前详情页章节。"
        ],
        businessRules: ["重点客户需要在头部显示强提示标记", "时间线按时间倒序展示"],
        dataRules: ["金额字段统一使用人民币格式", "时间线优先展示最近关键动作"],
        dataDefinitions: [
          {
            name: "contractAmount",
            label: "累计合同额",
            description: "客户历史合同累计金额，仅用于展示。",
            type: "currency",
            format: "¥#,##0",
            source: "prototypeStudioCustomerStore"
          },
          {
            name: "renewalProbability",
            label: "续约概率",
            description: "基于商机判断生成的示例字段。",
            type: "percentage",
            format: "0-100%"
          }
        ],
        calculationLogic: [
          {
            name: "statusBadge",
            description: "头部状态文案根据客户状态映射为活跃、待跟进或流失风险。",
            formula: "statusText(status)"
          }
        ],
        preconditions: [
          "必须从有效客户记录跳转或显式传入有效 customerId。",
          "查看编辑入口前，需要当前角色为 author、editor 或具备 manager 级权限。"
        ],
        fieldConstraints: [
          {
            field: "customerId",
            label: "客户编号",
            type: "string",
            required: true,
            format: "C-xxxx",
            notes: "缺失时回退到示例首个客户。"
          }
        ],
        sortingRules: [
          "时间线默认按日期倒序展示。",
          "联系人列表按业务主联系人优先，再按录入顺序展示。"
        ],
        formFields: [
          {
            field: "customer-detail-edit-button",
            label: "编辑信息",
            control: "action-button",
            required: false,
            notes: "仅在具备编辑权限时显示。"
          }
        ],
        exceptionHandling: [
          {
            scenario: "客户不存在",
            handling: "回退到示例首个客户并继续渲染详情页。"
          },
          {
            scenario: "查看者无编辑权限",
            handling: "隐藏编辑按钮，不展示可编辑控件。"
          }
        ],
        edgeCases: ["联系人区域为空", "查看者角色不显示编辑操作"],
        unresolvedQuestions: ["是否将商机信息并入详情页", "是否需要审批历史模块"],
        notes: ["高保真版本应接近真实企业软件详情页，同时保留足够的可修改空间。"],
      },
    ],
  };

  function getUserRole() {
    return role;
  }

  function canEditRequirements() {
    return role === "author" || role === "editor";
  }

  function canDownloadRequirements() {
    return role === "author" || role === "editor" || role === "viewer";
  }

  function getSectionByPageId(pageId) {
    return requirementDocument.sections.find((section) => section.pageId === pageId);
  }

  window.prototypeStudioRequirements = {
    requirementDocument,
    getUserRole,
    canEditRequirements,
    canDownloadRequirements,
    getSectionByPageId,
  };
})();
