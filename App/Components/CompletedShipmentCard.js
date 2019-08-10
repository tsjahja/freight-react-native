import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './CompletedShipmentCardStyle'
import { OpenSansBoldText, OpenSansItalicText, OpenSansLightText, OpenSansText } from './StyledText'
import moment from 'moment'
import { CargoHistoryCard } from './CargoHistoryCard'

export const CompletedShipmentCard = (props) => {
  const shipment = props.shipment
  const cargo = props.cargo
  return (
    <TouchableHighlight onPress={() => navigateToShipmentDetail(props.navigation, shipment, cargo)}>
      <View style={Style.card}>
        <View style={Style.cargo}>
          <View style={Style.cargoOriginDestination}>
            <View style={Style.cargoOriginDestinationText}>
              <View style={Style.cargoInfoField}>
                <OpenSansLightText>Origin</OpenSansLightText>
                <OpenSansBoldText>{shipment.destination.mainName}</OpenSansBoldText>
                <OpenSansItalicText>{shipment.destination.secondaryName}</OpenSansItalicText>
              </View>
              <View style={Style.cargoInfoField}>
                <OpenSansLightText>Destination</OpenSansLightText>
                <OpenSansBoldText>{shipment.destination.mainName}</OpenSansBoldText>
                <OpenSansItalicText>{shipment.destination.secondaryName}</OpenSansItalicText>
              </View>
            </View>
          </View>
          <View>{renderCargoInformation(cargo)}</View>
        </View>
        <View style={Style.bottomCardContainer}>
          <View style={Style.statusContainer}>
            <OpenSansText style={Style.statusText}>{shipment.status}</OpenSansText>
          </View>
          <View style={Style.buttonContainer}>
            <TouchableHighlight style={Style.button}>
              <OpenSansText style={Style.buttonText}>Inquire Again</OpenSansText>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const navigateToShipmentDetail = (navigation, shipment, cargo) => {
  navigation.navigate('ShipmentDetailScreen', {
    shipment: shipment,
    cargo: cargo,
  })
}

const renderCargoInformation = (cargo) => {
  switch (cargo.cargoType.type) {
    case 'FCL':
      return FCL(cargo)
    case 'LCL':
      return LCL(cargo)
    case 'Bulk':
      return Bulk(cargo)
    default:
      return null
  }
}

const FCL = (cargo) => {
  return <Text>{cargo.containerType.displayName}</Text>
}

const LCL = (cargo) => {
  return <Text>{cargo.quantity}</Text>
}

const Bulk = (cargo) => {
  return (
    <View style={Style.cargoInfo}>
      <View style={Style.cargoInfoField}>
        <OpenSansLightText>Departure</OpenSansLightText>
        <OpenSansBoldText>{moment(cargo.departure).format('D MMM YYYY')}</OpenSansBoldText>
      </View>
      <View style={Style.cargoInfoField}>
        <OpenSansLightText>Type</OpenSansLightText>
        <OpenSansBoldText>{cargo.bulkType.displayName}</OpenSansBoldText>
      </View>
      <View style={Style.cargoInfoField}>
        <OpenSansText>{cargo.weight} {cargo.weightUnit.toLowerCase()}</OpenSansText>
        <OpenSansText>{cargo.volume} {cargo.volumeUnit.toLowerCase()}</OpenSansText>
      </View>
    </View>
  )
}

CargoHistoryCard.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
}

FCL.propTypes = {
  containerType: PropTypes.object,
  displayName: PropTypes.string,
}

LCL.propTypes = {
  quantity: PropTypes.int,
}

Bulk.propTypes = {
  displayName: PropTypes.string,
  bulkType: PropTypes.object,
}

