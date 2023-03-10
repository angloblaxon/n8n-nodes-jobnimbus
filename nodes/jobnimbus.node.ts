import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { contactFields, contactOperations } from './contact.description';
//import { jobFields, jobOperations } from './job.description';
//import { taskFields, taskOperations } from './task.description';
//import { activityFields, activityOperations } from './activity.description';
//import { fileFields, fileOperations } from './file.description';
//import { customFields, customOperations } from './custom.description';

export class JobNimbus implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'JobNimbus',
		name: 'JobNimbus',
		icon: 'file:jobnimbus.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Node to interact with JobNimbus API',
		defaults: {
			name: 'JobNimbus',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'jobNimbusApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.jobnimbus.com',
			url: '/api1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Contacts',
						value: 'contacts',
					},
					{
						name: 'Jobs',
						value: 'jobs',
					},
					{
						name: 'Tasks',
						value: 'tasks',
					},
					{
						name: 'Activities',
						value: 'activities',
					},
                    {
						name: 'Files',
						value: 'files',
					},
                    {
						name: 'Custom Body',
						value: 'custom',
					},
				],
				default: 'contacts',
			},

			...contactOperations,
			...contactFields,
            //...contactOperations,
			//...contactFields,
            //...contactOperations,
			//...contactFields,
            //...contactOperations,
			//...contactFields,
            //...contactOperations,
			//...contactFields,
            //...contactOperations,
			//...contactFields,
		],
	};
}