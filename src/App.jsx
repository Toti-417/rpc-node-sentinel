import React, { useState } from 'react';
import { 
  Activity, 
  Server, 
  Radio, 
  Wifi, 
  AlertTriangle, 
  CheckCircle2, 
  BellRing, 
  RefreshCw, 
  Cpu, 
  Send, 
  Compass,
  Info,
  Network,
  ChevronUp,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import { RPC_NODES, TELEMETRY_METRICS } from './data/mockNodes';

export default function App() {
  const [nodes, setNodes] = useState(RPC_NODES);
  const [isPinging, setIsPinging] = useState(false);
  const [selectedNode, setSelectedNode] = useState(RPC_NODES[0]);
  const [webhookSent, setWebhookSent] = useState(false);
  const [showBispro, setShowBispro] = useState(true);

  // Simulated live latency jitter
  const triggerPingTest = () => {
    setIsPinging(true);
    setTimeout(() => {
      setNodes(prev => prev.map(n => {
        const delta = Math.floor(Math.random() * 9) - 4;
        const newLat = Math.max(12, n.latency + delta);
        return { ...n, latency: newLat };
      }));
      setIsPinging(false);
    }, 700);
  };

  const dispatchIncidentWebhook = (node) => {
    setWebhookSent(true);
    setTimeout(() => setWebhookSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans selection:bg-[#00f0ff] selection:text-black flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1e293b] bg-[#111827]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-black shadow-lg shadow-cyan-500/20">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-white tracking-tight">RPC Node Sentinel</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  Datadog & Linear Ops Standard
                </span>
              </div>
              <p className="text-xs text-gray-400">Multi-Chain RPC Latency Benchmarking, Block Drift Monitor & Webhook Incident Dispatcher</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowBispro(!showBispro)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all flex items-center space-x-1.5 ${
                showBispro 
                  ? 'bg-cyan-500 text-black font-semibold border-cyan-500 shadow-md shadow-cyan-500/20'
                  : 'bg-[#1e293b] text-gray-300 border-[#334155] hover:border-gray-500'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>{showBispro ? 'Hide Telemetry Guide' : 'View Architecture & Workflow'}</span>
              {showBispro ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
            </button>

            <button
              onClick={triggerPingTest}
              disabled={isPinging}
              className="bg-[#1e293b] hover:bg-cyan-500 hover:text-black text-cyan-300 border border-cyan-800/50 font-medium text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? 'Benchmarking...' : 'Ping Test'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bispro Flowchart Banner (ENGLISH) */}
      {showBispro && (
        <section className="border-b border-[#1e293b] bg-[#111827] py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e293b] pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    RPC Telemetry Architecture & SRE Desync Detection Workflow
                  </h2>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  End-to-end node health monitoring: How multi-chain RPC endpoints are polled, profiled for latency, and guarded against head drift.
                </p>
              </div>

              <div className="text-xs text-gray-400">
                <span className="bg-[#1e293b] border border-[#334155] px-2.5 py-1 rounded-md text-[11px] text-gray-300">
                  Target Role: <strong>Site Reliability Engineer (SRE) & Node Operations Specialist</strong>
                </span>
              </div>
            </div>

            {/* Visual Step-by-Step Flowchart in English */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              
              <div className="bg-[#0b0f19] border border-[#1e293b] p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black text-[11px] font-bold flex items-center justify-center">1</span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Heartbeat Poll</span>
                </div>
                <h4 className="text-xs font-bold text-white">Multi-Chain JSON-RPC Poll</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Engine dispatches periodic heartbeat requests (eth_blockNumber, getLatestBlockhash) across 6 RPC endpoints.
                </p>
              </div>

              <div className="bg-[#0b0f19] border border-[#1e293b] p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black text-[11px] font-bold flex items-center justify-center">2</span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Latency Metrics</span>
                </div>
                <h4 className="text-xs font-bold text-white">RTT Latency & Jitter Profiling</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Measures Round-Trip Time (RTT in ms), packet jitter variance, and HTTP error rates with sub-millisecond precision.
                </p>
              </div>

              <div className="bg-[#0b0f19] border border-[#1e293b] p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black text-[11px] font-bold flex items-center justify-center">3</span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Drift Analysis</span>
                </div>
                <h4 className="text-xs font-bold text-white">Head Desync & Drift Detection</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Compares node block height against peer consensus. Drift threshold flags an alert state when lagging &gt; 3 blocks.
                </p>
              </div>

              <div className="bg-[#0b0f19] border border-[#1e293b] p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black text-[11px] font-bold flex items-center justify-center">4</span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Gas Volatility</span>
                </div>
                <h4 className="text-xs font-bold text-white">Gas Volatility & Congestion</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Monitors EIP-1559 base fee surges and Solana priority micro-lamports to provide early network congestion warnings.
                </p>
              </div>

              <div className="bg-[#0b0f19] border border-cyan-800/50 p-3.5 rounded-xl space-y-2 bg-cyan-950/10">
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-emerald-400 text-black text-[11px] font-bold flex items-center justify-center">5</span>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Incident Alert</span>
                </div>
                <h4 className="text-xs font-bold text-white">Automated Alert Dispatch</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Instantly dispatches webhook alert payloads to Discord SRE channel, Telegram Ops bot, or PagerDuty incident bridge.
                </p>
              </div>

            </div>

            {/* Quick Navigation Guide */}
            <div className="bg-[#0b0f19] border border-[#1e293b] p-3 rounded-xl flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>UI Guide:</strong> Click any node in the matrix table to inspect diagnostic parameters, or click <em>Dispatch Webhook Test Payload</em> to test automated incident routing.</span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Real-time Telemetry Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#111827] border border-[#1e293b] p-4 rounded-xl">
            <span className="text-xs text-gray-400 block font-medium">Throughput Processed</span>
            <span className="text-xl font-bold text-cyan-400 font-mono mt-1 block">{TELEMETRY_METRICS.totalRequestsToday}</span>
            <span className="text-[11px] text-gray-500 mt-1">Multi-Chain RPC Volume</span>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] p-4 rounded-xl">
            <span className="text-xs text-gray-400 block font-medium">Global P99 Latency</span>
            <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">{TELEMETRY_METRICS.p99Latency}</span>
            <span className="text-[11px] text-gray-500 mt-1">SLA Target &lt; 100ms</span>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] p-4 rounded-xl">
            <span className="text-xs text-gray-400 block font-medium">Cluster Availability</span>
            <span className="text-xl font-bold text-white font-mono mt-1 block">{TELEMETRY_METRICS.globalUptime}</span>
            <span className="text-[11px] text-emerald-400 mt-1">Zero unplanned outages</span>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] p-4 rounded-xl">
            <span className="text-xs text-gray-400 block font-medium">Average Jitter</span>
            <span className="text-xl font-bold text-indigo-400 font-mono mt-1 block">{TELEMETRY_METRICS.averageJitter}</span>
            <span className="text-[11px] text-gray-500 mt-1">Packet Stability Index</span>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] p-4 rounded-xl">
            <span className="text-xs text-gray-400 block font-medium">Block Sync Deviation</span>
            <span className="text-xl font-bold text-amber-400 font-mono mt-1 block">1 Node Desynced</span>
            <span className="text-[11px] text-red-400 mt-1">Solana Backup Drift: -6</span>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Node Latency Matrix Table (8 cols) */}
          <div className="lg:col-span-8 bg-[#111827] border border-[#1e293b] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">RPC Cluster Endpoints</h3>
              </div>
              <span className="text-xs text-gray-400">Click node to inspect telemetry diagnostics</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1e293b] text-gray-400 uppercase text-[11px] font-semibold tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Node / Provider</th>
                    <th className="py-2.5 px-3">Chain</th>
                    <th className="py-2.5 px-3">Latency (ms)</th>
                    <th className="py-2.5 px-3">Block Height</th>
                    <th className="py-2.5 px-3">Head Drift</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e293b]">
                  {nodes.map(node => (
                    <tr 
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`cursor-pointer transition-colors ${
                        selectedNode.id === node.id ? 'bg-cyan-950/40 border-l-2 border-cyan-400' : 'hover:bg-[#1a2332]'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <strong className="text-white block font-medium">{node.name}</strong>
                        <span className="text-[10px] text-gray-500">{node.region} • {node.tier}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="text-gray-300">{node.chain}</span>
                        <span className="block text-[10px] text-amber-300/80 font-mono">{node.gasTracking}</span>
                      </td>

                      <td className="py-3 px-3 font-mono font-bold">
                        <span className={`${
                          node.latency < 35 ? 'text-emerald-400' :
                          node.latency < 70 ? 'text-cyan-400' :
                          node.latency < 120 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {node.latency} ms
                        </span>
                        <span className="block text-[10px] text-gray-500 font-normal">± {node.jitter}</span>
                      </td>

                      <td className="py-3 px-3 font-mono text-gray-300">
                        #{node.blockHeight.toLocaleString()}
                      </td>

                      <td className="py-3 px-3 font-mono">
                        {node.drift === 0 ? (
                          <span className="text-emerald-400 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>In Sync (0)</span>
                          </span>
                        ) : (
                          <span className="text-red-400 font-bold flex items-center space-x-1 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800/60">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{node.drift} Blocks Lag</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          node.status === 'Optimal' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' :
                          node.status === 'Healthy' ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/50' :
                          'bg-red-950/60 text-red-400 border border-red-800/50'
                        }`}>
                          {node.status.split(' ')[0]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Live Packet Waveform Simulated Feed */}
            <div className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center space-x-1.5 font-medium">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Real-Time RPC Telemetry Stream ({selectedNode.name})</span>
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">Heartbeat: 200 OK</span>
              </div>
              <div className="h-16 flex items-end space-x-1 pt-2">
                {[32, 28, 35, 42, 38, 29, 34, 45, 52, 31, 28, 34, 40, 36, 30, 28, 35, 38, 42, 34, 29, 36, 48, 32, 28, 30, 34, 42, 38, 35].map((h, i) => (
                  <div 
                    key={i}
                    style={{ height: `${h * 1.2}%` }}
                    className={`flex-1 rounded-t transition-all ${
                      h > 45 ? 'bg-amber-400' : 'bg-cyan-500/80 hover:bg-cyan-400'
                    }`}
                    title={`Tick ${i}: ${h}ms`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Node Details & Webhook Dispatcher (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                <h3 className="font-bold text-white text-sm">Node Deep Diagnostic</h3>
                <span className="text-[11px] font-mono text-cyan-400">{selectedNode.id}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#1e293b]">
                  <span className="text-gray-400">Node Cluster:</span>
                  <strong className="text-white">{selectedNode.name}</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#1e293b]">
                  <span className="text-gray-400">Deployment Tier:</span>
                  <span className="text-cyan-400">{selectedNode.tier}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#1e293b]">
                  <span className="text-gray-400">Host Region:</span>
                  <span className="text-gray-200">{selectedNode.region}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#1e293b]">
                  <span className="text-gray-400">Recorded Latency:</span>
                  <span className="font-mono font-bold text-white">{selectedNode.latency} ms (Jitter: {selectedNode.jitter})</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#1e293b]">
                  <span className="text-gray-400">Uptime Reliability:</span>
                  <span className="font-mono text-emerald-400">{selectedNode.uptime}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#1e293b]">
                  <span className="text-gray-400">RPC Error Rate:</span>
                  <span className="font-mono text-gray-200">{selectedNode.errorRate}</span>
                </div>
              </div>

              {/* Webhook Alert Simulator */}
              <div className="border border-[#1e293b] bg-[#0b0f19] p-4 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400">
                  <BellRing className="w-4 h-4" />
                  <span>SRE Alert Dispatcher:</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Simulate routing an automated webhook alert payload to Discord, Telegram, or PagerDuty when latency spikes or head desync occurs.
                </p>

                <button
                  onClick={() => dispatchIncidentWebhook(selectedNode)}
                  className="w-full bg-[#1e293b] hover:bg-cyan-500 hover:text-black border border-cyan-800/40 text-cyan-300 font-semibold text-xs py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Webhook Test Payload</span>
                </button>

                {webhookSent && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-[11px] text-emerald-300 flex items-center space-x-2 font-mono">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Payload Delivered (204 No Content) to Discord/Telegram SRE Bot</span>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </main>

      <footer className="border-t border-[#1e293b] bg-[#111827] py-4 px-4 text-center text-xs text-gray-500">
        Built by <strong>Toti Putra Pratama</strong> • Network Telemetry & Web3 Infrastructure Operations Specialist
      </footer>
    </div>
  );
}
