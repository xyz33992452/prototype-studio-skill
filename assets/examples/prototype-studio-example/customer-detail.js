const requirementsApi = window.prototypeStudioRequirements;
const requirementsUi = window.prototypeStudioRequirementsUi;
const navigationUi = window.prototypeStudioNavigationUi;
const customerStore = window.prototypeStudioCustomerStore;

const pageId = "page-customer-detail";
const searchParams = new URLSearchParams(window.location.search);
const customerId = searchParams.get("customerId") || "C-2001";
const role = requirementsApi.getUserRole();

const customer = customerStore.getCustomerById(customerId) || customerStore.listCustomers()[0];

function statusText(status) {
  if (status === "active") {
    return "活跃客户";
  }

  if (status === "follow") {
    return "待跟进客户";
  }

  return "流失风险客户";
}

function renderContacts(contacts) {
  const container = document.querySelector("#customer-detail-contacts");
  container.innerHTML = contacts
    .map(
      (contact) => `
        <div class="rounded-3xl border border-white/10 bg-black/10 p-4">
          <p class="text-sm text-slate-400">${contact.name} / ${contact.title}</p>
          <p class="mt-1 text-white">${contact.note}</p>
        </div>
      `
    )
    .join("");
}

function renderTimeline(timeline) {
  const container = document.querySelector("#customer-detail-timeline");
  container.innerHTML = timeline
    .map(
      (item) => `
        <div class="timeline-item rounded-3xl border border-white/10 bg-black/10 p-4">
          <p class="text-sm text-cyan-200">${item.date}</p>
          <p class="mt-2 text-white">${item.content}</p>
        </div>
      `
    )
    .join("");
}

function renderCustomerDetail() {
  document.querySelector("#customer-detail-back-link").href = `./customer-list.html?role=${encodeURIComponent(role)}`;
  document.querySelector("#customer-detail-name").textContent = customer.name;
  document.querySelector("#customer-detail-status").textContent = statusText(customer.status);
  document.querySelector("#customer-detail-id").textContent = `客户编号：${customer.id}`;
  document.querySelector("#customer-detail-owner").textContent = `负责人：${customer.owner}`;
  document.querySelector("#customer-detail-contract").textContent = customer.contractAmount;
  document.querySelector("#customer-detail-followup").textContent = customer.followUpLabel;
  document.querySelector("#customer-detail-renewal").textContent = customer.renewalProbability;
  document.querySelector("#customer-detail-industry").textContent = customer.industry;
  document.querySelector("#customer-detail-stage").textContent = customer.stage;
  document.querySelector("#customer-detail-need").textContent = customer.coreNeed;
  document.querySelector("#customer-detail-risk").textContent = customer.risk;

  if (role === "viewer") {
    document.querySelector("#customer-detail-edit-button").classList.add("hidden");
  }

  renderContacts(customer.contacts);
  renderTimeline(customer.timeline);
}

navigationUi.renderSharedNavigation({
  containerId: "customer-detail-shared-nav",
  pageId,
  role,
});

renderCustomerDetail();

requirementsUi.attachRequirementsOverlay({
  pageId,
  requirementDocument: requirementsApi.requirementDocument,
  initialSectionId: requirementsApi.getSectionByPageId(pageId)?.sectionId,
});
