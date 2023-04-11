import axios, {AxiosError} from "axios";

const API_URL = "https://dummyjson.com";

export type LoggedInUserType = {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string
}

class AuthService {
  static async login(email: string, password: string) {
    const response = await axios
        .post(API_URL + "/auth/login", {
          username: email,
          password: password
        })

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  }

  static logout() {
    localStorage.removeItem("user");
  }

  static async register(firstName: string, lastName: string, email: string, password: string) {
    try {
      await axios.post(API_URL + "/signup", {
        firstName,
        lastName,
        email,
        password
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.message)
      }
    }
  }

  static getCurrentUser(): LoggedInUserType | null {
    const userData = localStorage.getItem('user');

    if (userData === null) {
      return null
    }

    return JSON.parse(userData);
  }
}

export default AuthService;
