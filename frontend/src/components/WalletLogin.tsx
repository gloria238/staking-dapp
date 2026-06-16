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
          {/* 左侧：品牌介绍 */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                Production-Ready Web3
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              Stake with Confidence.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Earn with Precision.
              </span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed">
              Connect your wallet to access the DeFi Staking Dashboard. Manage stakes, track rewards, and explore real-time analytics — all in one place.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: Shield, label: 'Audited Contracts', desc: 'Security first' },
                { icon: Zap, label: 'Real-Time Events', desc: 'Live on-chain data' },
                { icon: TrendingUp, label: 'Competitive APY', desc: 'Maximize your yield' },
                { icon: Wallet, label: 'Non-Custodial', desc: 'You control your keys' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <item.icon className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：连接卡片 */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 mb-4">
                  <Wallet className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
                <p className="text-sm text-gray-400">
                  Securely connect to access your staking dashboard
                </p>
              </div>

              <button
                onClick={handleConnect}
                disabled={isPending}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
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

              <p className="mt-6 text-center text-xs text-gray-500">
                By connecting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}