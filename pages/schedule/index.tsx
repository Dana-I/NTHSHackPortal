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
import { withStyles, Theme, createStyles } from '@material-ui/core';
import { grey, indigo, blue, teal, purple, red, orange } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { WithStyles } from '@material-ui/styles';
import classNames from 'clsx';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PinDrop from '@material-ui/icons/PinDrop';
import ClockIcon from '@material-ui/icons/AccessTime';
import Backpack from '@material-ui/icons/LocalMall';
import Description from '@material-ui/icons/BorderColor';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import firebase from 'firebase';

const styles = ({ palette }: Theme) =>
  createStyles({
    appointment: {
      borderRadius: 0,
      borderBottom: 0,
    },
    filtered: {
      opacity: 0.3,
    },
    EventTypeAppointment: {
      border: `2px solid ${red[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 1px ${red[400]} `,
    },
    SponsorTypeAppointment: {
      border: `2px solid ${orange[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 4px ${orange[500]} `,
    },
    TechTalkTypeAppointment: {
      border: `2px solid ${indigo[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 4px ${indigo[500]} `,
    },
    WorkshopTypeAppointment: {
      border: `2px solid ${purple[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 4px ${purple[500]} `,
    },
    SocialTypeAppointment: {
      border: `2px solid ${blue[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 4px ${blue[500]} `,
    },
    weekEndCell: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      '&:focus': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
    },
    weekEndDayScaleCell: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06),
    },
    text: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    content: {
      opacity: 0.7,
    },
    container: {
      width: '100%',
      lineHeight: 1.2,
      height: '100%',
    },
  });

type AppointmentProps = Appointments.AppointmentProps & WithStyles<typeof styles>;
type AppointmentContentProps = Appointments.AppointmentContentProps & WithStyles<typeof styles>;

const isWeekEnd = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;
const defaultCurrentDate = new Date(2021, 10, 13, 9, 0);
const defaultStartDate = new Date(2024, 4, 25, 9, 0);
const defaultEndDate = new Date(2024, 4, 26, 9, 0);
{
  /* !!!change */
}

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(
  ({ classes, data, ...restProps }: AppointmentContentProps) => {
    let Event = 'Event';
    if (data.type === 'Required') Event = 'Required';
    if (data.type === 'Sponsor') Event = 'Sponsor';
    if (data.type === 'Tech Talk') Event = 'Tech Talk';
    if (data.type === 'Workshop') Event = 'Workshop';
    if (data.type === 'Social') Event = 'Social';

    const startDate = new Date(data.startDate);

    const formattedTime = startDate.toLocaleString([], { hour: 'numeric', minute: 'numeric' });

    return (
      <Appointments.AppointmentContent {...restProps} data={data}>
        <div className={classes.container}>
          <div className="flex justify-between">
            <div className={classes.text}>{formattedTime}</div>
            <div className={classes.text}>{data.title}</div>
          </div>
          <div className="flex justify-between">
            <div className={classNames(classes.text, classes.content)}>{`${data.type}`}</div>
            <div className={classNames(classes.text, classes.content)}>
              <LocationOnIcon style={{ fontSize: 'medium', margin: '2px' }} />
              {`${data.location}`}
            </div>
          </div>
        </div>
      </Appointments.AppointmentContent>
    );
  },
);

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
  const [filter, setFilter] = useState('All');

  // Scheduler configuration
  const Appointment = withStyles(styles)(
    ({ onClick, classes, data, ...restProps }: AppointmentProps) => (
      <Appointments.Appointment
        {...restProps}
        className={classNames({
          [classes.EventTypeAppointment]: data.Event === 'Required',
          [classes.SponsorTypeAppointment]: data.Event === 'Sponsor',
          [classes.TechTalkTypeAppointment]: data.Event === 'Tech Talk',
          [classes.WorkshopTypeAppointment]: data.Event === 'Workshop',
          [classes.SocialTypeAppointment]: data.Event === 'Social',
          [classes.filtered]: filter !== 'All' && data.type !== filter,
          [classes.appointment]: true,
        })}
        data={data}
        onClick={() => changeEventData(data)}
      />
    ),
  );

  const changeFilter = (newFilter: string) => {
    if (newFilter === filter) {
      setFilter('All');
    } else {
      setFilter(newFilter);
    }
  };

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
    if (track === 'Required') return teal;
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
      <div className="text-center text-4xl text-primaryDark font-black p-6">What to Expect?</div>
      <div className="flex justify-center items-center">
        <div className="border-2 border-blue-900 rounded-full px-8 my-4">
          <div className="text-center py-1 text-lg text-primaryDark font-bold">Filters</div>
          <div className="flex justify-center mb-2">
            <div
              onClick={() => changeFilter('Required')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-full ${
                filter === 'Required' ? 'bg-teal-500 text-white' : 'border-teal-500 text-teal-500'
              }`}
            >
              {' '}
              Required{' '}
            </div>
            <div
              onClick={() => changeFilter('Sponser')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-full ${
                filter === 'Sponser'
                  ? 'bg-orange-500 text-white'
                  : 'border-orange-500 text-orange-500'
              }`}
            >
              {' '}
              Sponser{' '}
            </div>
            <div
              onClick={() => changeFilter('Tech Talk')}
              className={`text-sm cursor-pointer	mx-1 px-2 h-8 py-1 border-2 rounded-full ${
                filter === 'Tech Talk' ? 'bg-red-500 text-white' : 'border-red-500 text-red-500'
              }`}
            >
              {' '}
              Tech Talk{' '}
            </div>
            <div
              onClick={() => changeFilter('Workshop')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-full ${
                filter === 'Workshop' ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500'
              }`}
            >
              {' '}
              Workshop{' '}
            </div>
            <div
              onClick={() => changeFilter('Social')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-full ${
                filter === 'Social'
                  ? 'bg-indigo-500 text-white'
                  : 'border-indigo-500 text-indigo-500'
              }`}
            >
              {' '}
              Social{' '}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap lg:justify-between px-6 h-[75vh]">
        {/* Calendar */}
        <div className="flex">
          <div className="p-1 overflow-y-auto overflow-x-hidden mx-auto lg:w-[80%] w-full h-full rounded-md">
            <div className="text-2xl font-black p-6 text-primaryDark">Day 1: Saturday</div>
            <Paper className="p-3">
              <Scheduler data={props.scheduleCard}>
                <ViewState defaultCurrentDate={defaultStartDate} />
                <DayView startDayHour={8} endDayHour={24} cellDuration={60} />
                <Appointments
                  appointmentComponent={Appointment}
                  appointmentContentComponent={AppointmentContent}
                />
                <Resources data={resources} mainResourceName={'track'} />
                <GroupingState grouping={grouping} groupByDate={() => true} />
              </Scheduler>
            </Paper>
          </div>

          <div className="p-1 overflow-y-auto overflow-x-hidden mx-auto lg:w-[80%] w-full h-full rounded-md">
            <div className="text-2xl font-black p-6 text-primaryDark">Day 2: Sunday</div>
            <Paper className="p-3">
              <Scheduler data={props.scheduleCard}>
                <ViewState defaultCurrentDate={defaultEndDate} />
                <DayView startDayHour={8} endDayHour={24} cellDuration={60} />
                <Appointments
                  appointmentComponent={Appointment}
                  appointmentContentComponent={AppointmentContent}
                />
                <Resources data={resources} mainResourceName={'track'} />
                <GroupingState grouping={grouping} groupByDate={() => true} />
              </Scheduler>
            </Paper>
          </div>
        </div>

        {/* Event info card */}
        {/*
        <div className="overflow-y-auto flex flex-col justify-between lg:w-[36%] w-full h-full lg:my-0 my-2 border-2 border-black rounded-md bg-white p-4">
          <section>
            {eventData.title === '' ? (
              <div className="text-2xl">Click on an event for more info</div>
            ) : (
              <div />
            )}
            <h1 className="md:text-4xl text-2xl font-bold">{eventData.title}</h1>
            <div className="md:text-lg text-sm mb-4">{eventData.speakers}</div>

            // Shows card info if user has clicked on an event
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
        */}
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
