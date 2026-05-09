
// Industry options for dropdown selectors
export const INDUSTRY_OPTIONS = [
  "Dental Clinics",
  "Real Estate Agents",
  "Fitness Studios",
  "Law Firms",
  "Marketing Agencies",
  "HVAC Companies",
  "Auto Dealerships",
  "Insurance Brokers",
  "Daycares",
  "Construction Firms"
];

// Mock data for charts and metrics
export const emailData = [
  { name: 'Mon', sent: 12, opened: 8, clicked: 5, replied: 3, bounced: 1 },
  { name: 'Tue', sent: 15, opened: 10, clicked: 7, replied: 4, bounced: 1 },
  { name: 'Wed', sent: 18, opened: 13, clicked: 9, replied: 6, bounced: 0 },
  { name: 'Thu', sent: 16, opened: 12, clicked: 8, replied: 5, bounced: 1 },
  { name: 'Fri', sent: 20, opened: 15, clicked: 11, replied: 7, bounced: 2 },
  { name: 'Sat', sent: 8, opened: 6, clicked: 4, replied: 2, bounced: 0 },
  { name: 'Sun', sent: 5, opened: 4, clicked: 2, replied: 1, bounced: 0 },
];

export const linkedInData = [
  { name: 'Mon', sent: 8, accepted: 5, replied: 3, viewed: 6 },
  { name: 'Tue', sent: 10, accepted: 7, replied: 4, viewed: 8 },
  { name: 'Wed', sent: 12, accepted: 8, replied: 5, viewed: 9 },
  { name: 'Thu', sent: 9, accepted: 6, replied: 3, viewed: 7 },
  { name: 'Fri', sent: 15, accepted: 10, replied: 6, viewed: 12 },
  { name: 'Sat', sent: 5, accepted: 3, replied: 2, viewed: 4 },
  { name: 'Sun', sent: 3, accepted: 2, replied: 1, viewed: 2 },
];

// Mock lead data for the map interface
export const mockLeads = [
  { id: 1, name: 'City Dental', industry: 'Dental Clinics', location: { lat: 40.7128, lng: -74.006 }, hasAppointment: false },
  { id: 2, name: 'Elite Realty', industry: 'Real Estate Agents', location: { lat: 40.7142, lng: -74.005 }, hasAppointment: true },
  { id: 3, name: 'Flex Fitness', industry: 'Fitness Studios', location: { lat: 40.7135, lng: -74.004 }, hasAppointment: false },
  { id: 4, name: 'Smith Legal', industry: 'Law Firms', location: { lat: 40.7156, lng: -74.007 }, hasAppointment: false },
  { id: 5, name: 'Creative Marketing', industry: 'Marketing Agencies', location: { lat: 40.7119, lng: -74.003 }, hasAppointment: true },
  { id: 6, name: 'Comfort HVAC', industry: 'HVAC Companies', location: { lat: 40.7125, lng: -74.008 }, hasAppointment: false },
  { id: 7, name: 'City Motors', industry: 'Auto Dealerships', location: { lat: 40.7150, lng: -74.010 }, hasAppointment: true },
  { id: 8, name: 'Secure Insurance', industry: 'Insurance Brokers', location: { lat: 40.7160, lng: -74.002 }, hasAppointment: false },
  { id: 9, name: 'Bright Beginnings', industry: 'Daycares', location: { lat: 40.7170, lng: -74.009 }, hasAppointment: false },
  { id: 10, name: 'Build Right', industry: 'Construction Firms', location: { lat: 40.7180, lng: -74.001 }, hasAppointment: true },
];

// Time period options for filtering
export const TIME_PERIOD_OPTIONS = [
  { label: "Daily", value: "day" },
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" }
];
