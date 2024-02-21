"use client";

import React from 'react'

import { useState, useEffect } from "react";

import database from "@/util/database";
import { Vote } from "@/models/vote";
import { Voter } from "@/models/voter"
import { ReloadIcon } from '@radix-ui/react-icons';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import candidates from '@/constants/candidates';
import CountdownTimer from '@/components/CountDownTimer';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const ResultsPage = () => {


  const [votes, setVotes] = useState<Vote[]>([]);
  const [voters, setVoters] = useState<Voter[]>([]);

  useEffect(() => {
    fetchVotes();
    fetchVoters();
  }, []);

  async function fetchVotes() {
    const votes = await database.getVotes();
    setVotes(votes);
  }

  async function fetchVoters() {
    const voters = await database.getVoters();
    setVoters(voters)
  }

  const getTotalVotes = () => {
    return votes.length;
  }

  const getVotesByParty = () => {
    const partyIds: { [key: string]: number } = {}; // Add index signature to allow indexing with a string
    for (const { party_id } of votes) { // Access 'votes' state variable
      partyIds[party_id] = (partyIds[party_id] || 0) + 1;
    }
    return partyIds; // Return the calculated result
  }





  const getPercentageOfVotesByParty = () => {
    const totalVotes = getTotalVotes();
    const votesByParty = getVotesByParty();
    const percentageByParty: { [key: string]: number } = {};

    for (const partyId in votesByParty) {
      percentageByParty[partyId] = (votesByParty[partyId] / totalVotes) * 100;
    }

    return percentageByParty;
  }








  const getVotesByProvince = () => {
    const provinceIds: { [key: string]: number } = {}; // Add index signature to allow indexing with a string
    for (const { voter } of votes) { // Access 'votes' state variable
      provinceIds[voter.province] = (provinceIds[voter.province] || 0) + 1;
    }
    return provinceIds; // Return the calculated result
  }

  const getVotesByPartyAndProvince = () => {
    const partyAndProvinceIds: { [key: string]: { [key: string]: number } } = {}; // Add index signature to allow indexing with a string
    for (const { party_id, voter } of votes) { // Access 'votes' state variable
      partyAndProvinceIds[party_id] = partyAndProvinceIds[party_id] || {};
      partyAndProvinceIds[party_id][voter.province] = (partyAndProvinceIds[party_id][voter.province] || 0) + 1;
    }
    return partyAndProvinceIds; // Return the calculated result
  }

  const getBarChartDataAndOptionsForStacked = () => {
    const parties = Object.keys(getVotesByPartyAndProvince());
    const partyList = parties.map(index => candidates[index]?.party);
    const provinces = new Set(); // Using a set to collect unique provinces
    parties.forEach((partyId) => {
      Object.keys(getVotesByPartyAndProvince()[partyId]).forEach((province) => {
        provinces.add(province); // Add province to set
      });
    });
    const uniqueProvinces = Array.from(provinces); // Convert set to array
    const colors = [
      'rgba(255, 99, 132, 0.9)',
      'rgba(67, 190, 212, 0.8)',
      'rgba(123, 234, 56, 0.7)',
      'rgba(22, 178, 98, 0.6)',
      'rgba(200, 45, 167, 0.5)',
      'rgba(90, 23, 211, 0.4)',
      'rgba(255, 180, 33, 0.3)',
      'rgba(73, 122, 240, 0.2)',
      'rgba(50, 210, 180, 0.1)',
    ]; // Define your own color scheme or use Chart.js built-in color schemes

    const colorMap = {}; // Map to store colors for each province
    uniqueProvinces.forEach((province, index) => {
      colorMap[province] = colors[index % colors.length]; // Assign color to province
    });




    const data = {
      labels: partyList,
      datasets: uniqueProvinces.map((province) => ({
        label: province,
        data: parties.map((partyId) => getVotesByPartyAndProvince()[partyId][province] || 0), // Fill in 0 for parties with no presence in the province
        backgroundColor: parties.map((partyId) => colorMap[province]), // Use color from color map
        borderColor: 'rgba(0, 0, 0, 1)', // Border color for bars
        borderWidth: 1,
      })),
    };

    const options = {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const totalVotes = getTotalVotes();
              const dataIndex = context.dataIndex;
              const value = context.dataset.data[dataIndex];
              const percentage = ((value / totalVotes) * 100).toFixed(2);
              return `${context.dataset.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };

    return { data, options };
  };


  const getBarChartDataAndOptions = () => {
    const parties = Object.keys(getVotesByParty());
    const partyList = parties.map(index => candidates[index]?.party);
    console.log(partyList);

    const data = {
      labels: partyList,
      datasets: [
        {
          label: 'Votes by Party',
          data: Object.values(getVotesByParty()),
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options: ChartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Votes',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Party',
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const totalVotes = getTotalVotes();
              const dataIndex = context.dataIndex;
              const value = context.dataset.data[dataIndex];
              const percentage = ((value / totalVotes) * 100).toFixed(2);
              return `${context.dataset.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };

    return { data, options };
  }

  const startDate = new Date();
  const endDate = new Date('2024-03-02T00:00:00');

  return (
    <div>
      {voters.length > 0 ? (
        <div>
          <h1
            className='text-3xl font-bold mb-4 text-center'
          >Latest election results</h1>

          <div
            className="text-2xl font-semibold mb-4 flex flex-row items-center justify-center gap-4"
          >
            <div className="blink-dot"></div>
            LIVE
          </div>
          <h2 className="text-center text-2xl font-semibold mb-4">Time Left to Vote:</h2>
          <CountdownTimer endDate={endDate} startDate={startDate} />



          <h3
            className='text-center text-2xl font-semibold mb-4'
          >
            Percentage of users voted:
            {
              // Calculate the percentage and round to two decimal places
              (Number((votes.length / voters.length * 100).toFixed(2)))
            } %
          </h3>

          <h3
            className='text-center text-2xl font-semibold mb-4'
          >Total votes: {getTotalVotes()}</h3>

          <Bar
            className='w-1/2 mx-auto mt-8'
            data={getBarChartDataAndOptions().data} options={getBarChartDataAndOptions().options} />

          <h2
          className='text-center text-2xl font-semibold mb-4'
          >Results by Party and Province</h2>

          <Bar
            className='w-1/2 mx-auto mt-8'
            data={getBarChartDataAndOptionsForStacked().data} options={getBarChartDataAndOptionsForStacked().options} />

        </div>
      ) : (
        <div
          className='text-center flex flex-col items-center gap-4 pt-4'
        >
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
          <p
          className='text-2xl font-semibold mb-4'
          >Loading results...</p>
        </div>
      )}
    </div>
  )
}

export default ResultsPage