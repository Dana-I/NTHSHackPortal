import * as React from 'react';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import LocationOnIcon from '@mui/icons-material/LocationOn';

/* Set event dates and times */
const day1StartDateAndTime = new Date(2024, 4, 25, 9, 0);
const day2StartDateAndTime = new Date(2024, 4, 26, 9, 0);
const eventEndDateAndTime = new Date(2024, 4, 27, 9, 0);

/* Calendar */
export default function Calendar(props: { scheduleCard: ScheduleEvent[] }) {
  /* Event Colors */
  const eventColors = {
    All: 'border-gray-500 text-gray-500',
    Required: 'border-[#FC012E] text-[#FC012E]',
    'Tech Talk': 'border-[#56E100] text-[#56E100]',
    Social: 'border-[#FFB900] text-[#FFB900]',
    Sponser: 'border-[#008CF1] text-[#008CF1]',
    Workshop: 'border-[#5200FF] text-[#5200FF]',
    'All-Filter': 'border-gray-500 bg-gray-500 text-white',
    'Required-Filter': 'border-[#FC012E] bg-[#FC012E] text-white',
    'Tech Talk-Filter': 'border-[#56E100] bg-[#56E100] text-white',
    'Social-Filter': 'border-[#FFB900] bg-[#FFB900] text-white',
    'Sponser-Filter': 'border-[#008CF1] bg-[#008CF1] text-white',
    'Workshop-Filter': 'border-[#5200FF] bg-[#5200FF] text-white',
  };

  /* Filter Functionality */
  const [filter, setFilter] = useState('All');

  const changeFilter = (newFilter: string) => {
    if (newFilter === filter) {
      setFilter('All');
    } else {
      setFilter(newFilter);
    }
  };

  /* Event Component */
  const Event = ({ data, index, arrayLength }) => {
    const startDate = new Date(data.startDate);
    const formattedTime = startDate
      .toLocaleString([], { hour: 'numeric', minute: 'numeric' })
      .replace(' ', '')
      .replace('AM', 'am')
      .replace('PM', 'pm');

    const showEvent = filter === 'All' || filter === data.type;
    const showFilteredEvents = filter !== 'All';

    const isLastEvent = index === arrayLength - 1;
    const hasEvenIndex = index % 2 === 0;

    return (
      showEvent && (
        <>
          <div
            className={`${
              !showFilteredEvents
                ? `${!hasEvenIndex && filter === 'All' ? 'bg-[#F2F3FF]' : 'bg-white'} 
                             ${
                               !isLastEvent && filter === 'All'
                                 ? 'p-4 border-b border-[#05149C]'
                                 : 'rounded-b-xl p-4'
                             }`
                : 'p-4 border-b border-[#05149C]'
            }
                          `}
          >
            <div className="flex justify-between pb-1">
              <div className="text-md font-bold">{formattedTime}</div>
              <div className="text-md font-bold">{data.title}</div>
            </div>
            <div className="flex justify-between">
              <div
                className={`bg-white text-xs rounded-xl py-1 px-2 border-2 ${
                  eventColors[data.type]
                }`}
              >
                {data.type}
              </div>
              <div className="text-gray-600 flex items-center">
                <LocationOnIcon style={{ fontSize: 'large', marginRight: '2px' }} />
                {data.location}
              </div>
            </div>
          </div>
        </>
      )
    );
  };

  /* Filter Daily Events */
  const getDailyEvents = (startTime, endTime) => {
    return props.scheduleCard
      .sort((a, b) => {
        return +new Date(a.startDate) - +new Date(b.startDate);
      })
      .filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startTime && eventDate <= endTime;
      })
      .map((event, index, array) => (
        <Event data={event} key={event.title + index} index={index} arrayLength={array.length} />
      ));
  };

  const day1Events = getDailyEvents(day1StartDateAndTime, day2StartDateAndTime);
  const day2Events = getDailyEvents(day2StartDateAndTime, eventEndDateAndTime);

  return (
    <div className="bg-[#F2F3FF]">
      <div className="text-center text-4xl font-bold text-[#05149C] p-4">What to Expect?</div>

      {/* Filter */}
      <div className="md:flex justify-center items-center mx-8">
        <div className="bg-white border-2 border-blue-900 rounded-2xl px-8 my-4">
          <div className="text-center py-1 text-xl font-bold text-[#05149C]">Filters</div>
          <div className="flex flex-wrap justify-center mb-2">
            <div
              onClick={() => changeFilter('All')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl border-gray-500 mb-1
              ${filter === 'All' ? eventColors['All-Filter'] : eventColors['All']}`}
            >
              All
            </div>

            <div
              onClick={() => changeFilter('Required')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Required' ? eventColors['Required-Filter'] : eventColors['Required']}`}
            >
              Required
            </div>

            <div
              onClick={() => changeFilter('Sponser')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Sponser' ? eventColors['Sponser-Filter'] : eventColors['Sponser']}`}
            >
              Sponser
            </div>

            <div
              onClick={() => changeFilter('Tech Talk')}
              className={`text-sm cursor-pointer	mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${
                filter === 'Tech Talk' ? eventColors['Tech Talk-Filter'] : eventColors['Tech Talk']
              }`}
            >
              Tech Talk
            </div>

            <div
              onClick={() => changeFilter('Workshop')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Workshop' ? eventColors['Workshop-Filter'] : eventColors['Workshop']}`}
            >
              Workshop
            </div>

            <div
              onClick={() => changeFilter('Social')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Social' ? eventColors['Social-Filter'] : eventColors['Social']}`}
            >
              Social
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="md:flex p-1 overflow-y-auto overflow-x-hidden mx-auto lg:w-[80%] w-full h-full">
        <div className="w-full lg:w-1/2 px-4 md:px-0">
          <div className="text-2xl font-black py-6 text-[#05149C]">Day 1: Saturday</div>
          <div className="bg-white mb-8 mx-2 p-2 border-2 rounded-2xl border-gray-300">
            {day1Events}
          </div>
        </div>

        <div className="w-full lg:w-1/2 md:ml-6 px-4 md:px-0">
          <div className="text-2xl font-black py-6 text-[#05149C]">Day 2: Sunday</div>
          <div className="bg-white mb-8 mx-2 p-2 border-2 rounded-2xl border-gray-300">
            {day2Events}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: scheduleData } = await RequestHelper.get<ScheduleEvent[]>(
    `${protocol}://${context.req.headers.host}/api/schedule`,
    {},
  );
  return {
    props: {
      scheduleCard: scheduleData,
    },
  };
};
