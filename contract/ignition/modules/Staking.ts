import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('StakingModule', (m) => {
  const deployer = m.getAccount(0)

  // 部署 token
  const token = m.contract('MockToken', [], {
    from: deployer,
  })

  // 部署 staking（传 token 地址）
  const staking = m.contract('Staking', [token], {
    from: deployer,
  })

  return { token, staking }
})