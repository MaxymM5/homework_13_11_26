import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const initialRestaurant = {
  name: "La Piazza",
  address: "м. Київ, вул. Хрещатик, 22",
  rating: 4.8,
  cuisine: "Італійська",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
};

// Завдання 1 і 2
function RestaurantCard({ restaurant, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(restaurant);

  useEffect(() => {
    setFormData(restaurant);
  }, [restaurant]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "rating" ? Number(value) : value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  }

  return (
    <section>
      <h2>Інформація про ресторан</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Назва:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <br />

          <label>
            Адреса:
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>

          <br />

          <label>
            Рейтинг:
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Тип кухні:
            <input
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
            />
          </label>

          <br />

          <label>
            Посилання на зображення:
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </label>

          <br />

          <button type="submit">Зберегти</button>

          <button
            type="button"
            onClick={() => {
              setFormData(restaurant);
              setIsEditing(false);
            }}
          >
            Скасувати
          </button>
        </form>
      ) : (
        <div>
          <h3>{restaurant.name}</h3>
          <p>Адреса: {restaurant.address}</p>
          <p>Рейтинг: {restaurant.rating}/5</p>
          <p>Тип кухні: {restaurant.cuisine}</p>

          <img
            src={restaurant.image}
            alt="Ресторан"
            style={{ width: "350px", maxWidth: "100%" }}
          />

          <br />

          <button onClick={() => setIsEditing(true)}>
            Редагувати
          </button>
        </div>
      )}
    </section>
  );
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    cuisine: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onSave: PropTypes.func.isRequired
};

// Завдання 3
function LoginPassword({ initialLogin, initialPassword }) {
  const [login, setLogin] = useState(initialLogin);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);

  const [savedData, setSavedData] = useState({
    login: initialLogin,
    password: initialPassword
  });

  function handleSubmit(e) {
    e.preventDefault();

    setSavedData({
      login,
      password
    });
  }

  return (
    <section>
      <h2>Логін і пароль</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Логін:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>

        <br />

        <label>
          Пароль:
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <br />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Приховати пароль" : "Показати пароль"}
        </button>

        <button type="submit">Зберегти</button>
      </form>

      <h3>Збережені дані:</h3>
      <p>Логін: {savedData.login}</p>
      <p>Пароль: {savedData.password}</p>
    </section>
  );
}

LoginPassword.propTypes = {
  initialLogin: PropTypes.string.isRequired,
  initialPassword: PropTypes.string.isRequired
};

// Головний компонент
function App() {
  const [restaurant, setRestaurant] = useState(() => {
    try {
      const saved = localStorage.getItem("restaurant");
      return saved ? JSON.parse(saved) : initialRestaurant;
    } catch {
      return initialRestaurant;
    }
  });

  useEffect(() => {
    localStorage.setItem("restaurant", JSON.stringify(restaurant));
  }, [restaurant]);

  return (
    <main>
      <h1>Домашнє завдання. Модуль 5</h1>

      <RestaurantCard
        restaurant={restaurant}
        onSave={setRestaurant}
      />

      <hr />

      <LoginPassword
        initialLogin=""
        initialPassword=""
      />
    </main>
  );
}

export default App;
