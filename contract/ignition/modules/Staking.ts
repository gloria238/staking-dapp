import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('StakingModule', (m) => {
  const deployer = m.getAccount(0)

  const token = m.contract('MockToken', [], {
    from: deployer,
  })

  const staking = m.contract('Staking', [token], {
    from: deployer,
  })

  return { token, staking }
})