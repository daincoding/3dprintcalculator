import { useEffect, useMemo, useState } from "react";
import ChatbotMascot from "./components/ChatbotMascot";

type Order = {
  id: string;
  name: string;
  createdAt: string; // ISO
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrderName, setNewOrderName] = useState("");

  // --- Calculator placeholder state (per active order) ---
  const [materialCost, setMaterialCost] = useState<string>("");
  const [printHours, setPrintHours] = useState<string>("");
  const [weightGrams, setWeightGrams] = useState<string>("");
  const [lastResult, setLastResult] = useState<number | null>(null);

  // --- Mascot state ---
  const [speaking, setSpeaking] = useState(false);
  const [bubble, setBubble] = useState("");

  const activeOrder = useMemo(
    () => orders.find((o) => o.id === activeOrderId) ?? null,
    [orders, activeOrderId]
  );

  function resetCalculatorUI() {
    setMaterialCost("");
    setPrintHours("");
    setWeightGrams("");
    setLastResult(null);
    setBubble("");
    setSpeaking(false);
  }

  // Reset UI whenever switching orders
  useEffect(() => {
    resetCalculatorUI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOrderId]);

  function openModal() {
    setNewOrderName("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setNewOrderName("");
  }

  function createOrder() {
    const name = newOrderName.trim();
    if (!name) return;

    const order: Order = {
      id: uid(),
      name,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [order, ...prev]);
    setActiveOrderId(order.id);
    closeModal();
  }

  function selectOrder(id: string) {
    setActiveOrderId(id);
  }

  function handleCalculate() {
    if (!activeOrder) return;

    // --- Example rough calculation (placeholder) ---
    // Replace this later with your real pricing engine.
    const m = Number(materialCost || 0); // €/kg
    const h = Number(printHours || 0); // hours
    const g = Number(weightGrams || 0); // grams

    // Example: material cost from grams + basic machine time
    const material = (g / 1000) * m;
    const machine = h * 2.5; // example €/h
    const result = Math.max(0, material + machine);

    setLastResult(result);

    // Trigger mascot bubble + speaking image
    setBubble(`Rough estimate: €${result.toFixed(2)}`);
    setSpeaking(false);
    requestAnimationFrame(() => setSpeaking(true));
  }

  return (
    <div className="h-screen w-screen bg-[rgb(var(--bg-main))] text-[rgb(var(--text-primary))]">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-[280px] shrink-0 border-r border-white/5 bg-[rgb(var(--bg-surface))]">
          <div className="flex items-center justify-between px-3 py-3">
            <div className="text-sm font-semibold tracking-wide text-[rgb(var(--text-primary))]">
              3DCalculation
            </div>

            <button
              className="btn btn-primary !px-3 !py-1.5"
              onClick={openModal}
              title="New order"
            >
              +
            </button>
          </div>

          <div className="px-3 pb-3">
            <div className="text-xs uppercase tracking-wider text-[rgb(var(--text-muted))]">
              Orders
            </div>
          </div>

          <nav className="px-2 space-y-1 overflow-y-auto h-[calc(100%-84px)]">
            {orders.length === 0 ? (
              <div className="px-2 py-2 text-sm text-[rgb(var(--text-muted))]">
                No orders yet. Click + to create one.
              </div>
            ) : (
              orders.map((o) => {
                const active = o.id === activeOrderId;
                return (
                  <button
                    key={o.id}
                    onClick={() => selectOrder(o.id)}
                    className={[
                      "w-full text-left rounded-lg px-3 py-2 transition",
                      active
                        ? "bg-[rgb(var(--bg-elevated))] border border-white/10 shadow-[0_0_16px_rgba(var(--accent),0.12)]"
                        : "hover:bg-[rgb(var(--bg-elevated))] border border-transparent",
                    ].join(" ")}
                  >
                    <div className="text-sm font-medium">{o.name}</div>
                    <div className="text-xs text-[rgb(var(--text-muted))]">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </button>
                );
              })
            )}
          </nav>
        </aside>

        {/* Main */}
        <main className="relative flex-1 overflow-hidden">
          <header className="h-14 border-b border-white/5 flex items-center px-5 bg-[rgb(var(--bg-main))]">
            <div className="text-sm text-[rgb(var(--text-muted))]">
              {activeOrder ? (
                <>
                  Order:{" "}
                  <span className="text-[rgb(var(--text-primary))] font-medium">
                    {activeOrder.name}
                  </span>
                </>
              ) : (
                "No order selected"
              )}
            </div>
          </header>

          <div className="h-[calc(100%-56px)] overflow-y-auto p-6">
            <div className="panel p-6 max-w-3xl">
              <h1 className="text-xl font-semibold">
                {activeOrder ? "Calculator" : "Welcome"}
              </h1>

              <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
                {activeOrder
                  ? "Placeholder calculator UI. Clicking Calculate triggers the mascot bubble."
                  : "Create an order on the left (+), then we’ll open it here."}
              </p>

              {activeOrder && (
                <>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="label">Material cost (€ / kg)</label>
                      <input
                        className="input w-full mt-2"
                        value={materialCost}
                        onChange={(e) => setMaterialCost(e.target.value)}
                        placeholder="25"
                      />
                    </div>

                    <div>
                      <label className="label">Print time (hours)</label>
                      <input
                        className="input w-full mt-2"
                        value={printHours}
                        onChange={(e) => setPrintHours(e.target.value)}
                        placeholder="4.5"
                      />
                    </div>

                    <div>
                      <label className="label">Weight (g)</label>
                      <input
                        className="input w-full mt-2"
                        value={weightGrams}
                        onChange={(e) => setWeightGrams(e.target.value)}
                        placeholder="120"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleCalculate}
                    >
                      Calculate
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={resetCalculatorUI}
                    >
                      Reset
                    </button>
                  </div>

                  <div className="mt-6 panel-elevated p-4">
                    <div className="text-sm font-medium">Result</div>
                    <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">
                      {lastResult === null
                        ? "No result yet."
                        : `€${lastResult.toFixed(2)}`}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mascot anchored to the MAIN area */}
          <ChatbotMascot
            speaking={speaking}
            message={bubble}
            onDone={() => setSpeaking(false)}
            durationMs={9600}
          />
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-header">
              <div className="text-base font-semibold">New Order</div>
              <button
                className="btn btn-ghost !px-3 !py-1.5"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <label className="label">Order name</label>
              <input
                className="input w-full mt-2"
                placeholder="e.g. Cyberpunk Katana Stand"
                value={newOrderName}
                onChange={(e) => setNewOrderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") createOrder();
                  if (e.key === "Escape") closeModal();
                }}
                autoFocus
              />
              <div className="mt-2 text-xs text-[rgb(var(--text-muted))]">
                Tip: hit Enter to create.
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={createOrder}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
