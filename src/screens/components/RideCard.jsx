import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';



export const RideCard = ({ date, time, location, price, requestedBy, duration, flexibleBy, additionalInfo }) => {

  const handleOfferToDrive = () => {
    const recipient = requestedBy.email;
    const subject = 'Offer to Drive';
    const body = `Hi ${requestedBy.name.trim().split(/\s+/)[0]},\n I'd be willing to drive you to ${location}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>

        {/* Interest Badge */}
        <View style={styles.interestBadge}>
          <Text style={styles.interestText}>Multiple people have expressed interest</Text>
        </View>

      </View>

      {/* Date and Time */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTime}>{`${date}\n${time}`}</Text>
        <Text style={styles.flexibleText}>{flexibleBy}</Text>
      </View>

      {/* Destination */}
      <View style={styles.locationContainer}>
        <MapPin size={16} color="#666" />
        <Text style={styles.location} numberOfLines={2} ellipsizeMode="tail">{location}</Text>
      </View>

      {/* Offer */}
      <Text style={styles.price}>${price}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>

          {/* Duration  */}
          <Clock size={16} color="#666" />
          <Text style={styles.infoText}>{duration} mins</Text>

        </View>
        <Text style={styles.additionalInfo}> {additionalInfo}</Text>
      </View>

      {/* Offer to Drive */}
      <TouchableOpacity style={styles.offerButton} onPress={handleOfferToDrive}>
        <Text style={styles.offerButtonText}>Offer to Drive</Text>
      </TouchableOpacity>

      {/* Requested By */}
      <Text style={styles.requestedBy}>Requested By: {requestedBy.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  interestBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 4,
  },
  interestText: {
    fontSize: 10,
    color: '#666',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateTime: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  flexibleText: {
    fontSize: 12,
    color: '#666',
    maxWidth: '50%',
    textAlign: 'right',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  additionalInfo: {
    fontSize: 14,
    color: '#666',
  },
  offerButton: {
    backgroundColor: '#000',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  offerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestedBy: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});