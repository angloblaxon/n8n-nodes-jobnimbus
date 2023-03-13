import { INodeProperties } from 'n8n-workflow';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['contacts'],
			},
		},
		options: [
            {
                name: 'Create a Contact',
				value: 'createcontact',
				action: 'Perform a GET request',
				routing: {
					request: {
						method: 'POST',
						url: '/contacts',
					},
				},
            },
            {
                name: 'Update a Contact',
				value: 'updatecontact',
				action: 'Perform a GET request',
				routing: {
					request: {
						method: 'PUT',
						url: '/contacts/{{$parameter.updateContactJNID}}', //need to add /{{jnid}} to the end of this
					},
				},
            },
            {
                name: 'Retrieve All Contacts',
				value: 'getallcontacts',
				action: 'Perform a GET request',
				routing: {
					request: {
						method: 'GET',
						url: '/contacts',
					},
				},
            },
            {
                name: 'Retrieve A Specific Contact',
				value: 'getcontact',
				action: 'Perform a GET request',
				routing: {
					request: {
						method: 'GET',
						url: '/contacts/{{$parameter.jnid}}', //need to add /{{jnid}} to the end of this
					},
				},
            },
		],
		default: 'get',
	},
];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const createContactOperation: INodeProperties[] = [
	{
		displayName: 'Contact Type',
		name: 'createContactType',
		default: 'residential',
		description: 'Select type of Contact to Create',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createcontact'],
			},
		},
		type: 'options',
		options: [
			{
				name: 'Residential',
				value: 'residential',
			},
			{
				name: 'Commercial',
				value: 'residential',
			},
			{
				name: 'Other',
				value: 'other',
			},
		],
		required: true,
	},
	{
		displayName: 'Display Name',
		name: 'createContactDisplayName',
		default: '',
		description: "The display name of the contact",
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createcontact'],
			},
		},
		required: true,
		type: 'string',
		placeholder: '',
		routing: {
			send: {
				type: 'body',
				property: 'display_name',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Company Name',
		name: 'createContactCompanyName',
		default: '',
		description: "The comapny name of the contact",
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createcontact'],
			},
			hide: {
				createContactType: ['residential', 'other'],
			},

		},
		required: true,
		type: 'string',
		placeholder: '',
		routing: {
			send: {
				type: 'body',
				property: 'company',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'createContactFirstName',
		default: '',
		description: "The first name of the contact",
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createcontact'],
			},
			hide: {
				createContactType: ['commercial', 'other'],
			},

		},
		required: true,
		type: 'string',
		placeholder: '',
		routing: {
			send: {
				type: 'body',
				property: 'first_name',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'createContactLastName',
		default: '',
		description: "The Last name of the contact",
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createcontact'],
			},
			hide: {
				createContactType: ['commercial', 'other'],
			},

		},
		required: true,
		type: 'string',
		placeholder: '',
		routing: {
			send: {
				type: 'body',
				property: 'last_name',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'createContactAdditionalFields',
		default: {},
		description: 'List of the values and fields to add to the created contact',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createcontact'],
			},
		},
		options: [
			{
				displayName: 'Additional Contact Fields',
				name: 'createContactExtraFields',
				placeholder: 'Add Field',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'updateFieldValues',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field Name',
								name: 'addFieldName',
								type: 'string',
								default: '',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=enumeration[{{$index}}].label',
										type: 'body',
									},
								},
								description: 'Name of the Field',
							},
							{
								displayName: 'Field Value',
								name: 'addFieldValue',
								type: 'string',
								default: '',
								description: 'Value of the field',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=enumeration[{{$index}}].value',
										type: 'body',
									},
								},
							},
						],
					},
				],
				default: {},
				description: 'List of fields and values that the contact can take. Please reference the API documentation for help.',
			},
		],
	},
];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const updateContactOperation: INodeProperties[] = [
	{
		displayName: 'JobNimbus ID',
		name: 'updateContactJNID',
		default: '',
		description: 'JobNimbus ID (jnid) of the Contact you would like to update.',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['updatecontact'],
			},
		},
		required: true,
		type: 'string',
	},
	{
		displayName: 'Contact Fields',
		name: 'updateContactFields',
		default: {},
		description: 'List of the values and fields to add or change on the specified contact. Ensure they match the proper formats.',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['updatecontact'],
			},
		},
		options: [
			{
				displayName: 'Contact Fields',
				name: 'updateContactAdditionalFields',
				placeholder: 'Add Field',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'updateFieldValues',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field Name',
								name: 'addFieldName',
								type: 'string',
								default: '',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=enumeration[{{$index}}].label',
										type: 'body',
									},
								},
								description: 'Name of the Field',
							},
							{
								displayName: 'Field Value',
								name: 'addFieldValue',
								type: 'string',
								default: '',
								description: 'Value of the field',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=enumeration[{{$index}}].value',
										type: 'body',
									},
								},
							},
						],
					},
				],
				default: {},
				description: 'List of fields and values that the contact can take. Please reference the API documentation for help.',
			},
		]
	}
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const retrieveAllContactOperation: INodeProperties[] = [
	{
		displayName: 'Query Limit',
		name: 'getAllContactsSize',
		default: 1000,
		description: 'Select the limit of how many contact records you would like to retrieve. Default is 1000',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['getallcontacts'],
			},
		},
		required: false,
		type: 'number',
		routing: {
			request: {
				qs: {
					size: '={{$value}}',
				}
			}
		}
	},
	{
		displayName: 'Retrieval Fields',
		name: 'getAllContactsFields',
		default: 'display_name,first_name,last_name',
		description: 'Comma separated list of all fields per contact you would like to retrieve.',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['getallcontacts'],
			},
		},
		required: false,
		type: 'string',
		routing: {
			request: {
				qs: {
					fields: '={{$value}}',
				}
			}
		}
	},
	{
		displayName: 'Sort Field',
		name: 'getAllContactsSortField',
		default: 'date_created',
		description: 'The field name you would like to sort the results by.',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['getallcontacts'],
			},
		},
		required: false,
		type: 'string',
		routing: {
			request: {
				qs: {
					sort_field: '={{$value}}',
				}
			}
		}
	},
	{
		displayName: 'Contact Fields',
		name: 'updateContactFields',
		default: {},
		description: 'List of the values and fields to add or change on the specified contact. Ensure they match the proper formats.',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['getallcontacts'],
			},
		},
		options: [
			{
				displayName: 'Contact Fields',
				name: 'updateContactAdditionalFields',
				placeholder: 'Add Field',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'updateFieldValues',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field Name',
								name: 'addFieldName',
								type: 'string',
								default: '',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=enumeration[{{$index}}].label',
										type: 'body',
									},
								},
								description: 'Name of the Field',
							},
							{
								displayName: 'Field Value',
								name: 'addFieldValue',
								type: 'string',
								default: '',
								description: 'Value of the field',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=enumeration[{{$index}}].value',
										type: 'body',
									},
								},
							},
						],
					},
				],
				default: {},
				description: 'List of fields and values that the contact can take. Please reference the API documentation for help.',
			},
		]
	}
];

export const contactFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                         Create Contact Operation                           */
	/* -------------------------------------------------------------------------- */
	...createContactOperation,

	/* -------------------------------------------------------------------------- */
	/*                         Update Contact Operation                           */
	/* -------------------------------------------------------------------------- */
	...updateContactOperation,
	/* -------------------------------------------------------------------------- */
	/*                     Retrieve All Contacts Operation                        */
	/* -------------------------------------------------------------------------- */
	...retrieveAllContactOperation,
];