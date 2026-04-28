(() => {
  const navigationConfig = window.prototypeNavigationConfig || [];

  function buildHref(item, role) {
    const params = new URLSearchParams();
    if (role) {
      params.set("role", role);
    }
    if (item.routeKey === "customer-detail") {
      params.set("customerId", "C-2001");
    }

    const query = params.toString();
    return `./${item.fileName}${query ? `?${query}` : ""}`;
  }

  function renderSharedNavigation({ containerId, pageId, role }) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
      return;
    }

    const items = navigationConfig.filter((item) => item.group === "crm-demo");
    container.innerHTML = `
      <div class="flex flex-wrap gap-2 rounded-2xl bg-slate-100/80 p-2">
        ${items
          .map((item) => {
            const isActive = item.pageId === pageId;
            const activeClass = isActive
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-50";

            return `
              <a
                class="rounded-xl px-4 py-2 text-sm font-medium transition ${activeClass}"
                href="${buildHref(item, role)}"
                data-nav-item-id="${item.navItemId}"
                data-route-key="${item.routeKey}"
                ${isActive ? 'aria-current="page"' : ""}
              >
                ${item.label}
              </a>
            `;
          })
          .join("")}
      </div>
    `;
  }

  window.prototypeStudioNavigationUi = {
    renderSharedNavigation,
  };
})();
