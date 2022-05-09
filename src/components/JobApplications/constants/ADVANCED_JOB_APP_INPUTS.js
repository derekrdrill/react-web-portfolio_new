export const ADVANCED_JOB_APP_INPUTS = [
  {
    id: 1,
    title: 'Personal Information',
    inputs: [
      {
        id: 'firstName',
        label: 'First Name',
        variant: 'outlined',
        xs: 12,
        sm: 6,
        md: 3,
      },
      {
        id: 'lastName',
        label: 'Last Name',
        variant: 'outlined',
        xs: 12,
        sm: 6,
        md: 3,
      },
      {
        id: 'email',
        label: 'Email',
        variant: 'outlined',
        xs: 12,
        sm: 6,
        md: 3,
        type: 'email',
      },
      {
        id: 'phone',
        label: 'Phone',
        variant: 'outlined',
        xs: 12,
        sm: 6,
        md: 3,
      },
    ],
  },
  {
    id: 2,
    title: 'Address Information',
    inputs: [
      {
        id: 'street',
        label: 'Street',
        variant: 'outlined',
        xs: 12,
      },
      {
        id: 'city',
        label: 'City',
        variant: 'outlined',
        xs: 12,
        md: 6,
      },
      {
        id: 'state',
        label: 'State',
        variant: 'outlined',
        xs: 6,
        md: 3,
      },
      {
        id: 'zip',
        label: 'Zip',
        variant: 'outlined',
        xs: 6,
        md: 3,
      },
    ],
  },
  {
    id: 3,
    title: 'Position Information',
    inputs: [
      {
        id: 'position',
        label: 'What position are you applying for?',
        variant: 'outlined',
        sm: 6,
        md: 6,
      },
      {
        id: 'startDate',
        label: 'When can you start?',
        variant: 'outlined',
        sm: 6,
        md: 6,
      },
      {
        id: 'fullOrPart',
        label: 'Full or part time?',
        variant: 'outlined',
        select: true,
        selectOptions: [
          {
            id: 1,
            value: 'Full time',
          },
          {
            id: 2,
            value: 'Part time',
          },
        ],
        sm: 6,
        md: 6,
      },
      {
        id: 'expectedPay',
        label: 'Expected pay rate',
        variant: 'outlined',
        sm: 6,
        md: 6,
      },
      {
        id: 'crime',
        label: 'Have you ever been convicted of a crime?',
        variant: 'outlined',
        select: true,
        selectOptions: [
          {
            id: 1,
            value: 'Yes',
          },
          {
            id: 2,
            value: 'No',
          },
        ],
        sm: 6,
        md: 6,
      },
      {
        id: 'crimeExplain',
        label: 'Please explain',
        variant: 'outlined',
        multiline: true,
        sm: 6,
        md: 6,
      },
    ],
  },
  {
    id: 4,
    title: 'Qualifications',
    instructions:
      'Please list any education or training you feel relates to the position you are applying for that would help you perform the work, such as, schools, colleges, degrees, vocational or technical programs, and military training',
    dynamicList: true,
    inputs: [
      {
        id: 'institution',
        label: 'Institution',
        variant: 'outlined',
        xs: 12,
        md: 6,
      },
      {
        id: 'fromYear',
        label: 'From Year',
        variant: 'outlined',
        xs: 6,
        md: 3,
      },
      {
        id: 'toYear',
        label: 'To Year',
        variant: 'outlined',
        xs: 6,
        md: 3,
      },
      {
        id: 'degreeReceived',
        label: 'Degree Received',
        variant: 'outlined',
        xs: 12,
        sm: 6,
      },
      {
        id: 'areaOfSpecialization',
        label: 'Area of Specialization',
        variant: 'outlined',
        xs: 12,
        sm: 6,
      },
    ],
  },
  {
    id: 5,
    title: 'Special Skills',
    inputs: [
      {
        id: 'specialSkills',
        label: 'Please list any skills you feel would help you in the position you are applying for',
        multiline: true,
        minRows: 3,
        xs: 12,
      },
    ],
  },
  {
    id: 6,
    title: 'References',
    instructions: 'Please at least 3 professional or educational references',
    dynamicList: true,
    inputs: [
      {
        id: 'referenceName',
        label: 'Name',
        xs: 12,
        sm: 6,
        md: 3,
      },
      {
        id: 'referenceEmail',
        label: 'Email',
        xs: 12,
        sm: 6,
        md: 3,
      },
      {
        id: 'referencePhone',
        label: 'Phone',
        xs: 12,
        sm: 6,
        md: 3,
      },
      {
        id: 'referenceRelationship',
        label: 'Relationship',
        xs: 12,
        sm: 6,
        md: 3,
      },
    ],
  },
  {
    id: 7,
    title: 'Supporting Documents',
    instructions: (
      <div>
        These documents could include Resume CV, Cover Letter, Letter of Recomendation, Transcript, etc
        <br />
        <i>This is not required, but information in these documents could impact our decision</i>
      </div>
    ),
    dynamicList: true,
    inputs: [
      {
        id: 'fileUpload',
        type: 'file',
        xs: 12,
      },
    ],
  },
];
