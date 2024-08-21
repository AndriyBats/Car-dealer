"use client";

import * as R from 'ramda';
import '../../../app/globals.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
//api
import { getModelsForMakeIdYear } from '../../../api/get-models-for-makeId-year'
// components
import Loader from '@/components';
// helpers
import * as H from '../../../helpers';
//////////////////////////////////////////////////

function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState()
  const { makeId, year } = router.query;

  const handleClick = event => {
    event.preventDefault();
    router.push('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Results } = await getModelsForMakeIdYear(makeId, year);

        setData(Results)

      } catch (error) {
      }
    };

    if (R.and(H.isNotNilAndNotEmpty(makeId), H.isNotNilAndNotEmpty(year))) {
      fetchData();
    }
  }, [makeId, year]);

  console.log('data', data);

  if (H.isNilOrEmpty(data)) return <Loader />

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="py-24 sm:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Car Dealer</h2>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300 mt-2">
                <thead>
                    <tr className="bg-gray-200 ">
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                            Make ID
                        </th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                            Make Name
                        </th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                            Model ID
                        </th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                            Model Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(item => (
                        <tr key={item.Model_ID} className="even:bg-gray-100">
                            <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                                {item.Make_ID}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                                {item.Make_Name}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                                {item.Model_ID}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                                {item.Model_Name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
              <button
                onClick={handleClick}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Return
              </button>
            </div>
    </main>

  );
};

export default ResultPage;
