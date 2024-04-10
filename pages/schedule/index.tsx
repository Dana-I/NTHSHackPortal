import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  AppointmentModel,
  GroupingState,
  IntegratedGrouping,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  Resources,
  GroupingPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { grey, indigo, blue, teal, purple, red, orange } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import PinDrop from '@mui/icons-material/PinDrop';
import ClockIcon from '@mui/icons-material/AccessTime';
import Backpack from '@mui/icons-material/LocalMall';
import Description from '@mui/icons-material/BorderColor';
import firebase from 'firebase';

const textClass = 'overflow-hidden text-ellipsis whitespace-nowrap';
const contentClass = 'opacity-[0.7]';
const containerClass = 'w-full h-full leading-[1.2]';

const appointmentBaseClass = 'rounded-none border-b-0 bg-[#212121] rounded-[8px]'; // grey[900]
const eventTypeClass = 'border-[2px] border-[#f44336] border-solid shadow-[0_0_16px_1px_#ef5350]'; // border: red[500], boxShadow: red[400]
const sponsorTypeClass = 'border-[2px] border-[#ff9800] border-solid shadow-[0_0_16px_1px_#ff9800]'; // border: orange[500], boxShadow: orange[500]
const techTalkTypeClass =
  'border-[2px] border-[#3f51b5] border-solid shadow-[0_0_16px_1px_#3f51b5]'; // border: indigo[500], boxShadow: indigo[500]
const workshopTypeClass =
  'border-[2px] border-[#9c27b0] border-solid shadow-[0_0_16px_1px_#9c27b0]'; // border: purple[500], boxShadow: purple[400]
const socialTypeClass = 'border-[2px] border-[#2196f3] border-solid shadow-[0_0_16px_1px_#2196f3]'; // border: blue[500], boxShadow: blue[500]

// const styles = ({ palette }: Theme) =>
//   createStyles({
//     weekEndCell: {
//       backgroundColor: alpha(palette.action.disabledBackground, 0.04),
//       '&:hover': {
//         backgroundColor: alpha(palette.action.disabledBackground, 0.04),
//       },
//       '&:focus': {
//         backgroundColor: alpha(palette.action.disabledBackground, 0.04),
//       },
//     },
//     weekEndDayScaleCell: {
//       backgroundColor: alpha(palette.action.disabledBackground, 0.06),
//     },
//   });

type AppointmentProps = Appointments.AppointmentProps;
type AppointmentContentProps = Appointments.AppointmentContentProps;

const isWeekEnd = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;
const defaultCurrentDate = new Date(2021, 10, 13, 9, 0);
{
  /* !!!change */
}

const AppointmentContent = ({ data, ...restProps }: AppointmentContentProps) => {
  let Event = 'Event';
  if (data.Event === 2) Event = 'Sponsor';
  if (data.Event === 3) Event = 'Tech Talk';
  if (data.Event === 4) Event = 'Workshop';
  if (data.Event === 5) Event = 'Social';

  return (
    <Appointments.AppointmentContent {...restProps} data={data}>
      <div className={containerClass}>
        <div className={textClass}>{data.title}</div>
        <div className={clsx(textClass, contentClass)}>{`Type: ${Event}`}</div>
        <div className={clsx(textClass, contentClass)}>{`Location: ${data.location}`}</div>
      </div>
    </Appointments.AppointmentContent>
  );
};

export default function Calendar(props: { scheduleCard: ScheduleEvent[] }) {
  // Hooks
  const [eventData, setEventData] = useState({
    title: '',
    speakers: '',
    date: '',
    time: '',
    page: '',
    description: '',
    location: '',
    track: '',
  });
  const [eventDescription, setEventDescription] = useState(null);

  // Scheduler configuration
  const Appointment = ({ onClick, data, ...restProps }: AppointmentProps) => (
    <Appointments.Appointment
      {...restProps}
      className={clsx({
        [appointmentBaseClass]: true,
        [eventTypeClass]: data.Event === 1,
        [sponsorTypeClass]: data.Event === 2,
        [techTalkTypeClass]: data.Event === 3,
        [workshopTypeClass]: data.Event === 4,
        [socialTypeClass]: data.Event === 5,
      })}
      data={data}
      onClick={() => changeEventData(data)}
    />
  );

  const changeEventData = (data: AppointmentModel) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    // format date of event
    const dateFormatter = new Intl.DateTimeFormat('default', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dayString = dateFormatter.format(startDate);

    const speakersData = data.speakers?.filter((speaker: string[]) => speaker.length !== 0);

    // format list of speakers of event, leaving blank if no speakers
    const speakerFormatter = new Intl.ListFormat('default', { style: 'long', type: 'conjunction' });
    const speakerString =
      speakersData?.length > 0 ? `Hosted by ${speakerFormatter.format(speakersData)}` : '';
    // format time range of event
    const timeFormatter = new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const timeString = timeFormatter.formatRange(startDate, endDate);

    //setting new event data based on event clicked
    setEventData({
      title: data.title,
      speakers: speakerString,
      date: dayString,
      time: timeString,
      page: data.page,
      description: data.description,
      location: data.location,
      track: data.track,
    });
  };

  useEffect(() => {
    // Split event description by newlines
    const descSplit = eventData.description.split('\n');
    setEventDescription(
      descSplit.map((d, i) => (
        <p key={i} className="mb-2">
          {d}
        </p>
      )),
    );
  }, [eventData]);

  const grouping = [
    {
      resourceName: 'track',
    },
  ];

  const trackColor = (track: string) => {
    if (track === 'General') return teal;
    if (track === 'Technical') return red;
    if (track === 'Social') return indigo;
    if (track === 'Sponsor') return orange;
    if (track === 'Workshop') return blue;
    else return teal;
  };

  const scheduleEvents = props.scheduleCard;
  const tracks = scheduleEvents.map((event) => event.track);
  const uniqueTracks = new Set(tracks);

  const resources = [
    {
      fieldName: 'track',
      title: 'track',
      instances: Array.from(
        new Set(
          Array.from(uniqueTracks).map((track) => ({
            id: track,
            text: track,
            color: trackColor(track),
          })),
        ),
      ),
    },
  ];

  return (
    <>
      <div className="text-6xl font-black p-6">Schedule</div>
      <div className="flex flex-wrap lg:justify-between px-6 h-[75vh]">
        {/* Calendar */}
        <div className="overflow-y-auto overflow-x-hidden lg:w-[62%] w-full h-full border-2 border-black rounded-md">
          <Paper>
            <div className="flex flex-row">
              <Scheduler data={props.scheduleCard}>
                <ViewState defaultCurrentDate={defaultCurrentDate} />
                <DayView startDayHour={8} endDayHour={24} intervalCount={1} />
                <Appointments
                  appointmentComponent={Appointment}
                  appointmentContentComponent={AppointmentContent}
                />
                <Resources data={resources} mainResourceName={'track'} />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <GroupingState grouping={grouping} groupByDate={() => true} />
                {/* since tracks are computed from entries, only show grouping if there are any tracks */}
                {uniqueTracks.size > 0 ? <IntegratedGrouping /> : null}
                {uniqueTracks.size > 0 ? <GroupingPanel /> : null}
              </Scheduler>
            </div>
          </Paper>
        </div>

        {/* Event info card */}
        <div className="overflow-y-auto flex flex-col justify-between lg:w-[36%] w-full h-full lg:my-0 my-2 border-2 border-black rounded-md bg-white p-4">
          <section>
            {eventData.title === '' ? (
              <div className="text-2xl">Click on an event for more info</div>
            ) : (
              <div />
            )}
            <h1 className="md:text-4xl text-2xl font-bold">{eventData.title}</h1>
            <div className="md:text-lg text-sm mb-4">{eventData.speakers}</div>

            {/* Shows card info if user has clicked on an event */}
            <div className={eventData.title === '' ? 'hidden' : 'inline'}>
              <div className="grid grid-cols-2 gap-y-2 md:my-8 my-6 md:text-lg text-sm">
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<CalendarIcon style={{ fontSize: 'medium', margin: '2px' }} />}
                    Date
                  </p>
                  <p>{eventData.date}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<PinDrop style={{ fontSize: 'medium', margin: '2px' }} />}
                    Location
                  </p>
                  <p>{eventData.location}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<ClockIcon style={{ fontSize: 'large', margin: '2px' }} />}
                    Time
                  </p>
                  <p>{eventData.time}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<Backpack style={{ fontSize: 'medium', margin: '2px' }} />}
                    Page
                  </p>
                  <p>{eventData.page}</p>
                </div>
              </div>

              <div className="lg:text-base text-sm">
                <p className="flex items-center font-semibold">
                  {<Description style={{ fontSize: 'medium', margin: '2px' }} />}
                  Description
                </p>
                <p>{eventDescription}</p>
              </div>
            </div>
          </section>

          <div className="text-right">*All events are given in CST</div>
        </div>
      </div>
    </>
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
