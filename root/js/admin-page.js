// data for the sake of the challenge. Otherwise, we should fetch it from db

let pizzas = [
  { type: "Pepperoni", order: 1, week: true, day: false },
  { type: "Neapolitan", order: 2, week: false, day: true },
  { type: "Calabrese", order: 3, week: false, day: false },
  { type: "Vegan", order: 4, week: false, day: false },
  { type: "Pineapple", order: 5, week: false, day: false },
];

window.addEventListener("load", function () {
  const pizzaType = this.document.querySelector("#pizza-type");
  const pizzaTypeError = this.document.querySelector("#pizza-type-error");
  const pizzaOrder = this.document.querySelector("#pizza-order");
  const pizzaOrderError = this.document.querySelector("#pizza-order-error");
  const pizzaWeek = this.document.querySelector("#pizza-week");
  const pizzaDay = this.document.querySelector("#pizza-day");

  const submitAdd = this.document.querySelector("#submit-add");
  const submitEdit = this.document.querySelector("#submit-edit");
  const submitDelete = this.document.querySelector("#submit-delete");
  const submitList = this.document.querySelector("#submit-list");

  const results = this.document.querySelector("#results");
  const resultsBkg = this.document.querySelector("#admin-results");
  const resultsContainer = this.document.querySelector(".admin-results-container");

  function isNumeric(n) {
    return !isNaN(parseFloat(n));
  }

  function formValidation(option) {
    let errors = false;

    if (pizzaType.value === "") {
      pizzaTypeError.innerText = "Write a type of pizza";
      errors = true;
      return errors;
    }

    if (option === "edit" || option === "delete") {
      const foundPizza = pizzas.filter(
        (pizza) => pizza.type === pizzaType.value
      );

      if (foundPizza.length === 0) {
        pizzaTypeError.innerText = "Pizza doesn't exist";
        errors = true;
        return errors;
      }
    }

    if (pizzaOrder.value === "" || !isNumeric(pizzaOrder.value)) {
      pizzaOrderError.innerText = "Write an order";
      errors = true;
      return errors;
    }
  }

  function addItem() {
    const newPizza = {
      type: pizzaType.value,
      order: Number(pizzaOrder.value),
      week: pizzaWeek.checked,
      day: pizzaDay.checked,
    };

    const editedPizzas = pizzas.map((pizza) => {
      if (newPizza.week && pizza.week) {
        pizza.week = false;
      }
      if (newPizza.day && pizza.day) {
        pizza.day = false;
      }
      if (pizza.order >= newPizza.order) {
        pizza.order++;
      }
      return pizza;
    });

    editedPizzas.push(newPizza);

    pizzas = editedPizzas;
  }

  function editItem() {
    const editedPizzas = pizzas.map((pizza) => {
      if (pizza.type === pizzaType.value) {
        newPizza = {
          type: pizzaType.value,
          order: Number(pizzaOrder.value),
          week: pizzaWeek.checked,
          day: pizzaDay.checked,
        };

        return newPizza;
      }

      if (pizzaWeek.checked && pizza.week) {
        pizza.week = false;
      }
      if (pizzaDay.checked && pizza.day) {
        pizza.day = false;
      }
      if (pizza.order >= Number(pizzaOrder.value)) {
        pizza.order++;
      }
      return pizza;
    });
    pizzas = editedPizzas;
  }

  function deleteItem() {
    const newPizzas = pizzas.filter((pizza) => pizza.type !== pizzaType.value);

    pizzas = newPizzas;
  }

  function createResults() {
    pizzas.sort((a, b) => a.order - b.order);

    pizzas.forEach((pizza) => {
      const item = document.createElement("li");
      item.innerText = `${pizza.type}${pizza.week ? "  -  Pizza of the Week" : ""}${pizza.day ? "  -  Pizza of the day." : ""}`
      results.appendChild(item);
    });
    resultsBkg.style.display = "flex";
  }

  submitAdd.addEventListener("click", (e) => {
    e.preventDefault();

    const isError = formValidation("add");

    if (!isError) {
      addItem();
      createResults();
    }
  });

  submitEdit.addEventListener("click", (e) => {
    e.preventDefault();

    const isError = formValidation("edit");

    if (!isError) {
      editItem();

      createResults();
    }
  });

  submitDelete.addEventListener("click", (e) => {
    e.preventDefault();

    const isError = formValidation("delete");

    if (!isError) {
      deleteItem();
      createResults();
    }
  });

  submitList.addEventListener("click", createResults);

  resultsBkg.addEventListener("click", () => {
    results.innerHTML = "";
    resultsBkg.style.display = "none";
  });

  resultsContainer.addEventListener("click", (e) => e.stopPropagation());
});
