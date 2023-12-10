import React from "react";
import ProductList from "./ProductList";
import Header from "./Header";
import NewProduct from "./NewProduct";

import SelectedproductList from "./SelectedproductList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          name: "iphone 15",
          price: 50000,
          image: "1.jpg",
        },
        {
          name: "iphone 16",
          price: 60000,
          image: "2.jpg",
        },
        {
          name: "iphone 17",
          price: 60000,
          image: "3.jpg",
        },
      ],
      selectedProducts: [
        {
          count: 1,
          product: {
            name: "iphone 17",
            price: 60000,
            image: "3.jpg",
          },
        },
      ],
    };
  }
  componentDidMount() {
    const selectedProducts = JSON.parse(
      localStorage.getItem("selectedProducts")
    );
    if (selectedProducts) {
      this.setState({
        selectedProducts: selectedProducts,
      });
    }
  }
  componentDidUpdate() {
    const jsonStr = JSON.stringify(this.state.selectedProducts);
    localStorage.setItem("selectedProducts", jsonStr);
  }
  deleteProduct = (product) => {
    this.setState((prev) => {
      const index = this.state.selectedProducts.findIndex(
        (item) => item.product.name == product.name
      );

      if (index > -1) {
        this.state.selectedProducts.splice(index, 1);
        return {
          selectedProducts: this.state.selectedProducts,
        };
      }
    });
  };
  selectProduct = (product) => {
    this.setState((prev) => {
      const index = this.state.selectedProducts.findIndex(
        (item) => item.product.name == product.name
      );

      if (index > -1) {
        const updatedList = this.state.selectedProducts.map((item) => {
          if (item.product.name == product.name) {
            item.count += 1;
          }
          return item;
        });
        return {
          selectedProducts: updatedList,
        };
      }
      const prd = {
        count: 1,
        product: product,
      };
      return { selectedProducts: prev.selectedProducts.concat(prd) };
    });
  };
  saveProduct = (product) => {
    this.setState((prev) => {
      return { products: prev.products.concat(product) };
    });
  };
  render() {
    return (
      <div className="container mt-5">
        <div className="row mt-5">
          <Header selectedProducts={this.state.selectedProducts} />
          <div className="col-4">
            <NewProduct saveProduct={this.saveProduct} />
          </div>
          <div className="col-4">
            <ProductList
              products={this.state.products}
              selectProduct={this.selectProduct}
            />
          </div>
          <div className="col-4">
            <SelectedproductList
              products={this.state.selectedProducts}
              deleteProduct={this.deleteProduct}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
