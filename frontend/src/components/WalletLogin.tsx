'use client'

import { useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Wallet, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function WalletLogin() {
  const { connect, isPending } = useConnect()
  const [error, setError] = useState('')

  const handleConnect = async () => {
    setError('')
    try {
      await connect({ connector: injected() })
    } catch (err) {
      setError('Wallet connection failed. Please make sure MetaMask or Rabby is installed and unlocked.')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Brand intro */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse-glow" />
              <span className="text-xs font-medium text-amber-400 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                Decentralized Finance
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Stake with Confidence.
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-violet-400 bg-clip-text text-transparent">
                Earn with Precision.
              </span>
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed">
              Connect your wallet to access the DeFi Staking Dashboard. Manage stakes, track rewards, and explore real-time analytics — all in one place.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: Shield, label: 'Audited Contracts', desc: 'Security first' },
                { icon: Zap, label: 'Real-Time Events', desc: 'Live on-chain data' },
                { icon: TrendingUp, label: 'Competitive APY', desc: 'Maximize your yield' },
                { icon: Wallet, label: 'Non-Custodial', desc: 'You control your keys' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-500/10 hover:bg-white/[0.05] transition-colors cursor-pointer">
                  <item.icon className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Connect card */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-violet-500/20 border border-amber-500/20 mb-4">
                  <Wallet className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Connect Your Wallet
                </h2>
                <p className="text-sm text-slate-400">
                  Securely connect to access your staking dashboard
                </p>
              </div>

              <button
                onClick={handleConnect}
                disabled={isPending}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
              >
                {isPending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect Wallet
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                  {error}
                </div>
              )}

              <p className="mt-6 text-center text-xs text-slate-500">
                By connecting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
