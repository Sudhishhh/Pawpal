import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { CreditCard, Wallet as Wallet2, Gift, DollarSign, Banknote } from 'lucide-react-native';

const PRESET_AMOUNTS = [10, 50, 100, 500, 1000];

export default function DonationScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const goalAmount = 10000;
  const currentAmount = 6500;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (text: string) => {
    setCustomAmount(text);
    setSelectedAmount(null);
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
  };

  const handleDonate = () => {
    const amount = selectedAmount || Number(customAmount);
    alert(`Thank you for your donation of $${amount}!`);
  };

  const isValidAmount = selectedAmount || (customAmount && Number(customAmount) > 0);
  const isPaymentSelected = selectedPayment !== null;
  const canDonate = isValidAmount && isPaymentSelected;

  React.useEffect(() => {
    setProgress((currentAmount / goalAmount) * 100);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Banknote size={32} color="#4CAF50" style={styles.headerIcon} />
        <Text style={styles.title}>Support Our Cause</Text>
        <Text style={styles.subtitle}>Help us care for stray animals</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>Monthly Goal</Text>
          <Text style={styles.progressAmount}>${goalAmount.toLocaleString()}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.raisedText}>Raised so far</Text>
          <Text style={styles.raisedAmount}>${currentAmount.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Amount</Text>
        <View style={styles.amountGrid}>
          {PRESET_AMOUNTS.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.amountButton,
                selectedAmount === amount && styles.amountButtonSelected,
              ]}
              onPress={() => handleAmountSelect(amount)}>
              <DollarSign 
                size={16} 
                color={selectedAmount === amount ? '#4CAF50' : '#718096'} 
              />
              <Text style={[
                styles.amountButtonText,
                selectedAmount === amount && styles.amountButtonTextSelected,
              ]}>
                {amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.customAmountContainer}>
          <Text style={styles.customAmountLabel}>Or enter custom amount</Text>
          <View style={styles.customAmountInputContainer}>
            <DollarSign size={20} color="#4CAF50" />
            <TextInput
              style={styles.customAmountInput}
              value={customAmount}
              onChangeText={handleCustomAmountChange}
              placeholder="Enter amount"
              keyboardType="decimal-pad"
              placeholderTextColor="#A0AEC0"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPayment === 'card' && styles.paymentMethodSelected,
            ]}
            onPress={() => handlePaymentSelect('card')}>
            <CreditCard
              size={24}
              color={selectedPayment === 'card' ? '#4CAF50' : '#4A5568'}
            />
            <Text style={[
              styles.paymentMethodText,
              selectedPayment === 'card' && styles.paymentMethodTextSelected,
            ]}>Credit Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPayment === 'wallet' && styles.paymentMethodSelected,
            ]}
            onPress={() => handlePaymentSelect('wallet')}>
            <Wallet2
              size={24}
              color={selectedPayment === 'wallet' ? '#4CAF50' : '#4A5568'}
            />
            <Text style={[
              styles.paymentMethodText,
              selectedPayment === 'wallet' && styles.paymentMethodTextSelected,
            ]}>Digital Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPayment === 'gift' && styles.paymentMethodSelected,
            ]}
            onPress={() => handlePaymentSelect('gift')}>
            <Gift
              size={24}
              color={selectedPayment === 'gift' ? '#4CAF50' : '#4A5568'}
            />
            <Text style={[
              styles.paymentMethodText,
              selectedPayment === 'gift' && styles.paymentMethodTextSelected,
            ]}>Gift Card</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.donateButton, !canDonate && styles.donateButtonDisabled]}
        onPress={handleDonate}
        disabled={!canDonate}>
        <Banknote size={24} color="#FFF" />
        <Text style={styles.donateButtonText}>
          Donate {isValidAmount ? `$${selectedAmount || customAmount}` : ''}
        </Text>
      </TouchableOpacity>

      <Text style={styles.secureText}>🔒 Secure payment powered by Stripe</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerIcon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#F0FFF0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '600',
  },
  progressAmount: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  raisedText: {
    fontSize: 14,
    color: '#718096',
  },
  raisedAmount: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 15,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  amountButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F7FAFC',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F7FAFC',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  amountButtonSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  amountButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
    marginLeft: 4,
  },
  amountButtonTextSelected: {
    color: '#4CAF50',
  },
  customAmountContainer: {
    marginTop: 10,
  },
  customAmountLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  customAmountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  customAmountInput: {
    flex: 1,
    fontSize: 18,
    color: '#2D3748',
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginLeft: 8,
  },
  paymentMethods: {
    gap: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F7FAFC',
  },
  paymentMethodSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#4A5568',
    marginLeft: 12,
    fontWeight: '500',
  },
  paymentMethodTextSelected: {
    color: '#4CAF50',
  },
  donateButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  donateButtonDisabled: {
    backgroundColor: '#CBD5E0',
  },
  donateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secureText: {
    textAlign: 'center',
    color: '#718096',
    fontSize: 14,
    marginTop: 16,
  },
});