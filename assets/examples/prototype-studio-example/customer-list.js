const requirementsApi = window.prototypeStudioRequirements;
const requirementsUi = window.prototypeStudioRequirementsUi;
const navigationUi = window.prototypeStudioNavigationUi;
const customerStore = window.prototypeStudioCustomerStore;
const pageId = "page-customer-list";

const tableBody = document.querySelector("#customer-list-table-body");
const dialogRoot = document.querySelector("#dialog-root");
const emptyState = document.querySelector("#customer-list-empty-state");
const searchInput = document.querySelector("#customer-search");
const statusFilter = document.querySelector("#customer-status-filter");
const ownerFilter = document.querySelector("#customer-owner-filter");
const followUpFilter = document.querySelector("#customer-followup-filter");
const resetButton = document.querySelector("#customer-reset-filter");
const applyButton = document.querySelector("#customer-apply-filter");

function statusClass(status) {
  if (status === "active") {
    return { className: "status-chip status-chip--active", label: "活跃" };
  }

  if (status === "follow") {
    return { className: "status-chip status-chip--follow", label: "待跟进" };
  }

  return { className: "status-chip status-chip--risk", label: "流失风险" };
}

function buildDetailLink(customerId) {
  const role = requirementsApi.getUserRole();
  return `./customer-detail.html?role=${encodeURIComponent(role)}&customerId=${encodeURIComponent(customerId)}`;
}

function matchesFilters(customer) {
  const keyword = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const owner = ownerFilter.value;
  const followUp = followUpFilter.value;

  const matchesKeyword =
    !keyword ||
    customer.id.toLowerCase().includes(keyword) ||
    customer.name.toLowerCase().includes(keyword);

  const matchesStatus = status === "all" || customer.status === status;
  const matchesOwner = owner === "all" || customer.owner === owner;
  const matchesFollowUp = !followUp || customer.followUp === followUp;

  return matchesKeyword && matchesStatus && matchesOwner && matchesFollowUp;
}

function renderCustomers() {
  const customers = customerStore.listCustomers().filter(matchesFilters);
  emptyState.classList.toggle("hidden", customers.length > 0);

  const rows = customers
    .map((customer) => {
      const status = statusClass(customer.status);

      return `
        <tr class="customer-row rounded-3xl bg-slate-50">
          <td class="rounded-l-3xl px-4 py-4">
            <div class="flex flex-col">
              <a class="text-sm font-semibold text-slate-900 hover:text-cyan-600" href="${buildDetailLink(customer.id)}">
                ${customer.name}
              </a>
              <span class="mt-1 text-xs text-slate-500">${customer.id}</span>
            </div>
          </td>
          <td class="px-4 py-4 text-sm text-slate-700">${customer.industry}</td>
          <td class="px-4 py-4 text-sm text-slate-700">${customer.owner}</td>
          <td class="px-4 py-4"><span class="${status.className}">${status.label}</span></td>
          <td class="px-4 py-4 text-sm text-slate-700">${customer.followUp}</td>
          <td class="rounded-r-3xl px-4 py-4">
            <div class="flex justify-end gap-2">
              <a class="rounded-full border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-white" href="${buildDetailLink(customer.id)}">查看</a>
              <button class="rounded-full border border-rose-200 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50" data-delete-customer="${customer.id}">删除</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  tableBody.innerHTML = rows;
}

function showDeleteDialog(customerId) {
  dialogRoot.innerHTML = `
    <div class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/35 px-4">
      <div class="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl">
        <p class="text-sm uppercase tracking-[0.3em] text-rose-500">删除确认</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-900">确认删除客户 ${customerId} 吗？</h3>
        <p class="mt-3 text-sm leading-6 text-slate-600">
          这是一个原型示例，不会真的删除数据，但会展示真实系统里常见的二次确认交互。
        </p>
        <div class="mt-6 flex justify-end gap-3">
          <button id="cancel-delete" type="button" class="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">取消</button>
          <button id="confirm-delete" type="button" class="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500">确认删除</button>
        </div>
      </div>
    </div>
  `;

  dialogRoot.querySelector("#cancel-delete").addEventListener("click", () => {
    dialogRoot.innerHTML = "";
  });

  dialogRoot.querySelector("#confirm-delete").addEventListener("click", () => {
    dialogRoot.innerHTML = "";
    window.alert(`示例模式：已执行删除流程 ${customerId}`);
  });
}

function resetFilters() {
  searchInput.value = "";
  statusFilter.value = "all";
  ownerFilter.value = "all";
  followUpFilter.value = "";
  renderCustomers();
}

function attachListInteractions() {
  tableBody.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const customerId = target.getAttribute("data-delete-customer");
    if (customerId) {
      showDeleteDialog(customerId);
    }
  });

  applyButton.addEventListener("click", renderCustomers);
  resetButton.addEventListener("click", resetFilters);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      renderCustomers();
    }
  });
}

navigationUi.renderSharedNavigation({
  containerId: "customer-list-shared-nav",
  pageId,
  role: requirementsApi.getUserRole(),
});

renderCustomers();
attachListInteractions();

requirementsUi.attachRequirementsOverlay({
  pageId,
  requirementDocument: requirementsApi.requirementDocument,
  initialSectionId: requirementsApi.getSectionByPageId(pageId)?.sectionId,
});
