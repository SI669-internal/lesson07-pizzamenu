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

class PizzaSizeButton extends React.Component {

  constructor(props) {
    super(props);
      this.label = props.size;
      this.parent = props.parent;
      this.price = prices[this.label.toLowerCase()];
  }

  handlePress = () => {
    let newState = {};
    newState.pizzaSize = this.label;
    newState.pizzaTotal = this.price;
    newState.pizzaSummary = newState.pizzaSize + " pizza";
    this.parent.updateTotal(newState);
    this.parent.setState(newState);
  }

  render() {
    return (
      <TouchableOpacity 
        style={styles.sizeButton}
        onPress={this.handlePress}>
        <Text>{this.label[0]}</Text>
        <Text style={styles.tiny}>${this.price}</Text>
      </TouchableOpacity>
    );
  }
}

class ToppingSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.topping = props.topping;
    this.property = this.topping.toLowerCase();
    this.parent = props.parent;
  }

  handleValueChange = (value) => {
    let newState = {};
    for (t of toppings) {
      newState[t] = this.parent.state[t];
    }
    newState[this.property] = value;
    this.parent.updateToppings(newState);
    this.parent.updateTotal(newState);
    this.parent.setState(newState);
  }

  render() {
    return (
      <View style={styles.sectionItem}>
        <Text style={styles.sectionItemText}>{this.topping}</Text>
        <Switch
          onValueChange={this.handleValueChange}
          value={this.parent.state[this.property]}
        />
      </View>
    );
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
  
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
    newState.toppingsTotal = numToppings * prices.topping * 2;
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
    newState.total = newTotal;
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
              <PizzaSizeButton
                size="Small"
                parent={this}/>
              <PizzaSizeButton
                size="Medium"
                parent={this}/>
              <PizzaSizeButton
                size="Large"
                parent={this}/>
            </View>
          </View>
          
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Toppings ($1.99 each)</Text>
          </View>

          <View style={styles.sectionList}>
            <ToppingSwitch
              topping="Pepperoni"
              parent={this}
            />
            <ToppingSwitch
              topping="Sausage"
              parent={this}
            />
            <ToppingSwitch
              topping="Mushrooms"
              parent={this}
            />
            <ToppingSwitch
              topping="Onions"
              parent={this}
            />                        
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
            <Text style={styles.sectionItemText}>Total</Text>
            <Text style={styles.sectionItemText}>${this.state.total.toFixed(2)}</Text>
          </View>
          <View style={styles.orderSummaryButtons}>
            <TouchableOpacity
              style={styles.orderSummaryButton}>
              <Text> Place Order </Text>
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
  tiny: {
    fontSize: 9
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
    alignItems: 'center',
    marginTop: 20
  },
  orderSummaryButton: {
    backgroundColor: 'lightblue',
    width: '50%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '40%',
    alignItems: 'flex-end',
    paddingHorizontal: '3%'
  },
});
