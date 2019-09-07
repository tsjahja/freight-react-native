import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { ContractDetail } from '../../Components/ContractDetail'
import { connect } from 'react-redux'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import Style from './ContractDetailScreenStyle'
import { OpenSansBoldText, OpenSansText } from '../../Components/StyledText'
import ContractActions from '../../Stores/Contract/Actions'
import {
  ACTION_REQUIRED, CUSTOMER_ACCEPT_OTHER_CONTRACT,
  CUSTOMER_ACCEPTED,
  CUSTOMER_DECLINED, CUSTOMER_EXPIRED,
  CUSTOMER_NEGOTIATE, DECLINED, EXPIRED, TRANSPORTER_EXPIRED,
  TRANSPORTER_OFFERED, WAITING_REPLY,
} from '../../Helper/ContractHelper'

class ContractDetailScreen extends Component {
  render() {
    const contract = this.props.navigation.getParam('contract')
    const cargo = this.props.navigation.getParam('cargo')

    if (contract === undefined || cargo === undefined) {
      return null
    }

    return (
      <View style={Style.container}>
        <View style={Style.header}>
          <OpenSansBoldText style={Style.headerTitle}>#{contract.id}</OpenSansBoldText>
        </View>
        <ContractDetail contract={contract} cargo={cargo}/>
        {renderButton(contract)}
      </View>
    )
  }
}

const renderButton = (contract) => {
  switch (contract.status) {
    case TRANSPORTER_OFFERED:
      return renderActionButton(contract)
    case CUSTOMER_NEGOTIATE:
      return renderStatus(contract, 'Waiting for Reply', Style.negotiate)
    case CUSTOMER_DECLINED:
    case CUSTOMER_ACCEPT_OTHER_CONTRACT:
      return renderStatus(contract, 'Declined', Style.decline)
    case CUSTOMER_EXPIRED:
    case TRANSPORTER_EXPIRED:
      return renderStatus(contract, 'Expired', Style.decline)
    default:
      return null
  }
}

const renderActionButton = (contract) => {
  return (
    <View style={Style.buttonContainer}>
      <TouchableOpacity
        style={[Style.decline, Style.button]}
        onPress={() => {
          const payload = {
            contractId: contract.id,
            status: CUSTOMER_DECLINED,
          }
          this.props.updateContractStatus(payload)
        }}
      >
        <OpenSansText style={Style.buttonText}>DECLINE</OpenSansText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Style.negotiate, Style.button]}
        onPress={() => {
          const payload = {
            contractId: contract.id,
            status: CUSTOMER_NEGOTIATE,
          }
          this.props.updateContractStatus(payload)
        }}
      >
        <OpenSansText style={Style.buttonText}>NEGOTIATE</OpenSansText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Style.accept, Style.button]}
        onPress={() => {
          const payload = {
            contractId: contract.id,
            status: CUSTOMER_ACCEPTED,
          }
          this.props.updateContractStatus(payload)
        }}
      >
        <OpenSansText style={Style.buttonText}>ACCEPT</OpenSansText>
      </TouchableOpacity>
    </View>
  )
}

const renderStatus = (contract, title, style) => {
  return (
    <View style={[style, Style.statusContainer]}>
      <OpenSansText style={Style.statusText}>{title}</OpenSansText>
    </View>
  )
}

ContractDetailScreen.propTypes = {
  navigation: PropTypes.object,
  cargoContract: PropTypes.object,
  cargoContractIsLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  cargoContract: state.contract.cargoContract,
  cargoContractIsLoading: state.contract.cargoContractIsLoading,
})

const mapDispatchToProps = (dispatch) => ({
  updateContractStatus: (param) => dispatch(ContractActions.updateContractStatus(param)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDetailScreen)
