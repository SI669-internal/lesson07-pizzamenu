import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Switch } from 'react-native';

const prices = {
  large: 11.99,
  medium: 9.99,
  small: 7.99,
  topping: 1.99,
  tax: 0.06
}
const toppings = [
  'pepperoni',
  'sausage',
  'mushrooms',
  'onions'
];

export default class App extends React.Component {

  constructor(props) {
    super(props);
  
    this.pizzaEmoji = '\u1F355';
    this.state = {
      orderName: 'Guest',
      pizzaSize: 'Large',
      pepperoni: false,
      sausage: false,
      mushrooms: false,
      onions: false,
      pizzaSummary: 'Large pizza',
      toppingsSummary: '0 toppings',
      pizzaTotal: prices.large,
      toppingsTotal: 0,
      taxTotal: 0,
      tip: 0,
      total: 0,
    }
    this.updateTotal(this.state);
  }

  updateToppings(newState) {
    let numToppings = 0;
    let toppingsLabel = '';
    for (t of toppings) {
      if (newState[t]) {
        numToppings++;
        toppingsLabel += t + ',';
      }
    }
    if (numToppings > 0) {
      toppingsLabel = toppingsLabel.slice(0, -1);
      toppingsLabel = '(' + toppingsLabel + ')';
    }

    newState.toppingsTotal = numToppings * prices.topping;
    newState.toppingsSummary = numToppings + ' toppings ' + toppingsLabel;
  }


  updateTotal(newState) {
    let newTotal = 0;

    if (newState.pizzaTotal) {
      newTotal += newState.pizzaTotal;
    } else {
      newTotal += this.state.pizzaTotal;
    }

    if (newState.toppingsTotal) {
      newTotal += newState.toppingsTotal;
    } else {
      newTotal += this.state.toppingsTotal;
    }

    newState.taxTotal = newTotal * prices.tax;
    newTotal += newState.taxTotal;

    if (newState.tip && !(isNaN(newState.tip))) {
      newTotal += newState.tip;
    } else {
      newTotal += this.state.tip;
    }
    newState.total = newTotal;
  }

  handleSizeChange(newSize) {
    let newState = {};
    newState.pizzaSize = newSize;
    newState.pizzaTotal = prices[newSize.toLowerCase()];
    newState.pizzaSummary = newState.pizzaSize + " pizza";
    this.updateTotal(newState);
    this.setState(newState);
  }

  handleSmall = () => {
    this.handleSizeChange('Small');
  }

  handleMedium = () => {
    this.handleSizeChange('Medium');
  }

  handleLarge = () => {
    this.handleSizeChange('Large');
  }

  handleToppings(value, topping) {
    let newState = {};
    for (t of toppings) {
      newState[t] = this.state[t];
    }

    newState[topping] = value;
    this.updateToppings(newState);
    this.updateTotal(newState);
    this.setState(newState);
  }

  handlePepperoni = (value) => {
    this.handleToppings(value, 'pepperoni');
  }

  handleSausage = (value) =>  {
    this.handleToppings(value, 'sausage');
  }

  handleMushrooms = (value) =>  {
    this.handleToppings(value, 'mushrooms');
  }

  handleOnions = (value) => {
    this.handleToppings(value, 'onions');
  }

  render() {
    return (
      <View style={styles.container}>
        
        {/* header */}
        <View style={styles.header}> 
          <Text style={[styles.headerText, {color: 'red'}]}>🍕Let's 
          <Text style={{color: 'green'}}> Get </Text> 
          <Text style={{color: 'white'}}>Pizza!! 🍕</Text></Text>
        </View>
        
        {/*menu area*/}
        <View style={styles.menu}> 
          <View style={styles.nameSection}>
            <Text style={styles.nameLabel}>Name for the order:</Text>
            <TextInput style={styles.textInput}
                onChangeText={(value) => {this.setState({orderName: value})}}/>
          </View>
          <View style={styles.pizzaSize}>

            <View style={styles.pizzaSizeLabel}>
              <Text style={styles.pizzaSizeText}>Size: {this.state.pizzaSize}</Text>
            </View>
            <View style={styles.sizeButtonGroup}>
              <TouchableOpacity 
                style={styles.sizeButton}
                onPress={this.handleSmall}>
                <Text>S</Text>
                <Text style={styles.tiny}>$7.99</Text>
              </TouchableOpacity >
              <TouchableOpacity 
                style={styles.sizeButton}
                onPress={this.handleMedium}>
                <Text>M</Text>
                <Text style={styles.tiny}>$9.99</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.sizeButton}
                onPress={this.handleLarge}>
                <Text>L</Text>
                <Text style={styles.tiny}>$11.99</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Toppings ($1.99 each)</Text>
          </View>

          <View style={styles.sectionList}>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Pepperoni</Text>
              <Switch
                onValueChange={this.handlePepperoni}
                value={this.state.pepperoni}
              />
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Sausage</Text>
              <Switch
                onValueChange={this.handleSausage}
                value={this.state.sausage}
              />
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Mushrooms</Text>
              <Switch
                onValueChange={this.handleMushrooms}
                value={this.state.mushrooms}
              />
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Onions</Text>
              <Switch
                onValueChange={this.handleOnions}
                value={this.state.onions}
              />
            </View>
          </View>

        </View>

        {/*order summary*/}
        <View style={styles.orderSummary}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Order Summary for {this.state.orderName}</Text>
          </View>
          <View style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>{this.state.pizzaSummary}</Text>
            <Text style={styles.sectionItemText}>${this.state.pizzaTotal}</Text>
          </View>
          <View style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>{this.state.toppingsSummary}</Text>
            <Text style={styles.sectionItemText}>${this.state.toppingsTotal}</Text>
          </View>
          <View style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Tax (6%)</Text>
            <Text style={styles.sectionItemText}>${this.state.taxTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Total</Text>
            <Text style={styles.sectionItemText}>${this.state.total.toFixed(2)}</Text>
          </View>
          <View style={styles.orderSummaryButtons}>
            <TouchableOpacity
              style={styles.orderSummaryButton}>
              <Text> Reset </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderSummaryButton}>
              <Text> Confirm </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    flex: 0.1,
    paddingTop: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444'
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  nameSection: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  nameLabel: {
    fontSize: 24
  },
  menu: {
    flex: 0.5,
    width: '100%',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  pizzaSize: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sizeButtonGroup: {
    flexDirection: 'row',
  },
  sizeButton: {
    padding: 10, 
    margin: 10, 
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'lightblue'
  }, 
  pizzaSizeText:{
    fontSize: 24
  },  
  sectionHeaderText: {
    paddingTop: 24,
    paddingBottom: 12,
    fontSize: 24
  },
  sectionItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    paddingRight: 20
  },
  sectionItemText: {
    fontSize: 18
  },
  orderSummary: {
    flex: 0.4,
    borderTopColor: 'black',
    borderTopWidth: 1,
    margin: 10
  },
  sectionItemText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderSummaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  orderSummaryButton: {
    backgroundColor: 'lightblue',
    width: '25%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '40%',
    alignItems: 'flex-end'
  },
  tiny: {
    fontSize: 9
  },
});
