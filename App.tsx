/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthTabStack, MainTabScreen } from './src/components/comman/Navbar';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  const isAuthenticated = false;
  return (
    <StripeProvider publishableKey="pk_test_51PQjJtLiUPTed1yfGPKLiObVcb9pKaK9BPmRjAVGs8dOS69xcrE0nsjZKqku6mj67lNnH4AYXqqs1FGsrHtaxPZP00ujX2OSrM">
      <NavigationContainer>
        {isAuthenticated ? <MainTabScreen /> : <AuthTabStack />}
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
