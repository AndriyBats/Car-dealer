"use client";

import * as R from 'ramda';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
//api
import { getModelsForMakeIdYear } from '../../../api/get-models-for-makeId-year'
// helpers
import * as H from '../../../helpers';
//////////////////////////////////////////////////

function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState()
  const { makeId, year } = router.query;

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

  return (
    <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Learn how to grow your business with our expert advice.
                </p>
            </div>
        </div>
    </div>
  );
};

export default ResultPage;
