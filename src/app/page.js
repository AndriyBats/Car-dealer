"use client";

import * as R from 'ramda';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
// components
import Loader from '@/components';
// helpers
import * as H from '../helpers';
// api
import { getMakesForVehicleType } from '../api/makes-for-vehicle-type';
//////////////////////////////////////////////////

function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState({})
  const [carTypes, setCarTypes] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    router.push(`/result/${selected.MakeId}/${selectedDate.getFullYear()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Results } = await getMakesForVehicleType();

        setCarTypes(Results)
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (H.isNotNilAndNotEmpty(carTypes)) {
      setSelected(carTypes[0])
    };
  }, [carTypes]);

  if (H.isNilOrEmpty(carTypes)) return <Loader />

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Choose vehicle types and model years
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Listbox value={selected} onChange={setSelected}>
                <Label className="block text-sm font-medium leading-6 text-gray-900">Vehicle types</Label>
                <div className="relative mt-2">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate min-h-6">{selected.MakeName}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                  >
                    {carTypes.map(item => (
                      <ListboxOption
                        key={item.MakeId}
                        value={item}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                            {item.MakeName}
                          </span>
                        </div>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Model years
                </label>
              </div>
              <div className="mt-2">
                <div className="relative max-w-sm">
                  <DatePicker
                    showYearPicker
                    dateFormat="yyyy"
                    selected={selectedDate}
                    popperClassName="w-full"
                    wrapperClassName="w-full"
                    placeholderText="Select year"
                    minDate={new Date(2015, 0, 1)}
                    onChange={date => setSelectedDate(date)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={R.or(H.isNilOrEmpty(selected), H.isNilOrEmpty(selectedDate))}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Home
