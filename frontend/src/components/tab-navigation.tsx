type Tab = {
  id: string;
  label: string;
};

type TabNavigationProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  isInView: boolean;
  backgroundClass?: string;
};

export default function TabNavigation({
  tabs,
  activeTab,
  setActiveTab,
  isInView,
  backgroundClass = "bg-darkgreen",
}: TabNavigationProps) {
  return (
    <div
      className={`flex flex-wrap justify-center mb-8 border-2 border-green-800 mx-auto ${backgroundClass}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-6 py-3 text-sm transition-colors ${
            activeTab === tab.id
              ? "bg-dark text-primary-green"
              : "text-lightgreen hover:bg-dark/50"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
