import "./App.css";

export default function App() {
  return (
    <div className="panel p-6 space-y-4">
      <h1 className="text-xl font-semibold">3D Print Calculator</h1>

      <label className="label">Material cost (€ / kg)</label>
      <input className="input w-48" placeholder="25.00" />

      <div className="flex gap-3">
        <button className="btn btn-primary">Calculate</button>
        <button className="btn btn-ghost">Reset</button>
      </div>
    </div>
  );
}
