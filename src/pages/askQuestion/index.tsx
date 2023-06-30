import Header from "../../components/Header";
import styles from "./index.module.css";
import React from "react";
import axios from "axios";
import { redirect } from 'next/navigation'
import { useState } from "react";
import { Router, useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    destination_city: "",
    destination_country: "",
    duration: "",
    imageUrl: "",
    free_food: false,
    price: 0,
    date: "",
    description: "",
    travel_by: "",
  });

  function handleChange(event: any) {
    const { name, value, type } = event.target;


    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? !prevFormData.free_food : value,
      };
    });
    console.log(formData);
  }

  async function handleSumbit(event: any) {
    event.preventDefault(); 
    console.log("Sending a form to server");

    try {
      const response = await axios.post(
        "http://localhost:8080/",
        formData
      );

      if (response) {
        router.push('/');
      }

    } catch (error) {
      console.log("Failed to save data to database, error: ", error);
    }
  }

  return (
    <div className={styles.imageBackground}>
      <Header></Header>

      <main className="w-screen mt-8">
        <section className="bg-zinc-50 w-4/5 p-5 mx-auto h-full flex flex-wrap">
          <h1 className="w-full text-center text-2xl mb-6">Add a New Trip</h1>
          <form
            className="max-w-3xl mx-auto grid justify-around gap-x-28 lg:grid-cols-2 p-2 sm:grid-cols-1"
            onSubmit={handleSumbit}
          >
            <div className="col-start-1 col-end-2 mb-6">
              <label
                htmlFor="destination_city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Destination City
              </label>
              <input
                onChange={handleChange}
                value={formData.destination_city}
                type="text"
                id="destination_city"
                name="destination_city"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="col-start-1 col-end-2 mb-6">
              <label
                htmlFor="destination_country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Destination Country
              </label>
              <input
                onChange={handleChange}
                value={formData.destination_country}
                type="text"
                id="destination_country"
                name="destination_country"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="col-start-1 col-end-2 mb-6">
              <label
                htmlFor="duration"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Duration in days
              </label>
              <input
                onChange={handleChange}
                value={formData.duration}
                type="text"
                id="duration"
                name="duration"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="15"
                required
              />
            </div>

            <div className="col-start-1 col-end-2 mb-6">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Price €
              </label>

              <input
                onChange={handleChange}
                value={formData.price}
                type="text"
                id="price"
                name="price"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Price"
                required
              />
            </div>

            <div className="col-start-1 col-end-2  mb-6">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Date
              </label>
              <input
                onChange={handleChange}
                value={formData.date}
                type="date"
                id="date"
                name="date"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="col-start-1 col-end-2 mb-6">
              <label
                htmlFor="imageUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Image Url
              </label>
              <input
                onChange={handleChange}
                value={formData.imageUrl}
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://yourphoto.com"
                required
              />
            </div>

            <div className="col-start-1 col-end-2 mb-6">
              <label
                htmlFor="transport"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Travel by
              </label>
              <select
                required
                onChange={handleChange}
                value={formData.travel_by}
                id="travel_by"
                name="travel_by"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose</option>
                <option value="plane">Plane</option>
             
                <option value="train">Train</option>
              </select>
            </div>

            <div className="col-start-1 col-end-2 mb-6 flex  justify-between">
              <label
                htmlFor="free_food"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Free Food
              </label>
              <input
                onChange={handleChange}
                //@ts-ignore
                value={formData.free_food}
                type="checkbox"
                id="free_food"
                name="free_food"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-5 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-5 flex flex-col sm:grid-col-start-1 sm:grid-col-end-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                onChange={handleChange}
                required
          
                value={formData.description}
                name="description"
                id="description"
                className="block p-2.5 w-full  max-h-40 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write travel description here..."
                maxLength={155}
                      //@ts-ignore
                cols="40"
                      //@ts-ignore
                rows="30"
              ></textarea>
            </div>



            <div className="col-start-1 col-end-2 mb-6 grid justify-center">
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Publish
              </button>
            </div>

       
          </form>
        </section>
      </main>
    </div>
  );
}
