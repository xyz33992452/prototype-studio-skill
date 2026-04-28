(() => {
  const customers = [
    {
      id: "C-2001",
      name: "云桥零售示例客户",
      industry: "零售连锁",
      owner: "王晨",
      status: "active",
      followUp: "2026-04-25",
      followUpLabel: "2 天前",
      contractAmount: "¥3,680,000",
      renewalProbability: "78%",
      stage: "续约谈判",
      coreNeed: "门店经营数据整合与分层分析",
      risk: "试点门店数据回传仍有延迟",
      contacts: [
        { name: "陈宁", title: "信息化负责人", note: "负责项目立项、预算确认与内部协调。" },
        { name: "徐航", title: "运营经理", note: "重点关注门店执行效率与经营分析看板。" },
      ],
      timeline: [
        { date: "2026-04-24", content: "完成高层沟通，确认二期试点门店范围。" },
        { date: "2026-04-18", content: "与运营团队评审经营分析看板草案。" },
      ],
    },
    {
      id: "C-2002",
      name: "辰光制造示例客户",
      industry: "智能制造",
      owner: "李悦",
      status: "follow",
      followUp: "2026-04-24",
      followUpLabel: "3 天前",
      contractAmount: "¥2,240,000",
      renewalProbability: "64%",
      stage: "方案确认",
      coreNeed: "供应链计划与工单流转协同",
      risk: "跨工厂流程口径仍需统一",
      contacts: [
        { name: "何钰", title: "工厂运营总监", note: "重点关注交付周期与计划协同效率。" },
      ],
      timeline: [
        { date: "2026-04-24", content: "补充工单追踪需求，等待客户确认优先级。" },
      ],
    },
    {
      id: "C-2003",
      name: "云石医疗示例客户",
      industry: "医疗服务",
      owner: "赵宁",
      status: "risk",
      followUp: "2026-04-22",
      followUpLabel: "5 天前",
      contractAmount: "¥1,560,000",
      renewalProbability: "41%",
      stage: "试点复盘",
      coreNeed: "多院区数据权限与审批闭环",
      risk: "院区协同链路仍未完全打通",
      contacts: [
        { name: "赵景", title: "信息中心主管", note: "关注权限模型与审计追踪能力。" },
      ],
      timeline: [
        { date: "2026-04-22", content: "客户反馈试点院区操作链路偏长，需要继续优化。" },
      ],
    },
    {
      id: "C-2004",
      name: "远航物流示例客户",
      industry: "仓储物流",
      owner: "王晨",
      status: "active",
      followUp: "2026-04-21",
      followUpLabel: "6 天前",
      contractAmount: "¥4,020,000",
      renewalProbability: "82%",
      stage: "扩容评估",
      coreNeed: "仓网调度与异常预警联动",
      risk: "夜间调度规则仍需补充",
      contacts: [
        { name: "刘洲", title: "调度平台主管", note: "重点关注跨仓异常流转与夜间预警机制。" },
      ],
      timeline: [
        { date: "2026-04-21", content: "扩容需求已进入预算评审阶段。" },
      ],
    },
  ];

  function listCustomers() {
    return customers.slice();
  }

  function getCustomerById(customerId) {
    return customers.find((customer) => customer.id === customerId);
  }

  window.prototypeStudioCustomerStore = {
    listCustomers,
    getCustomerById,
  };
})();
