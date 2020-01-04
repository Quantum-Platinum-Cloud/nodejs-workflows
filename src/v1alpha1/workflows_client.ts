// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  LROperation,
  PaginationCallback,
  PaginationResponse,
} from 'google-gax';
import * as path from 'path';

import {Transform} from 'stream';
import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './workflows_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Manages workflow programs.
 * @class
 * @memberof v1alpha1
 */
export class WorkflowsClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  auth: gax.GoogleAuth;
  operationsClient: gax.OperationsClient;
  workflowsStub: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of WorkflowsClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof WorkflowsClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof WorkflowsClient).scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    const protos = gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      workflowPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/workflows/{workflow}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listWorkflows: new gaxModule.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'workflows'
      ),
    };

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const protoFilesRoot = opts.fallback
      ? gaxModule.protobuf.Root.fromJSON(require('../../protos/protos.json'))
      : gaxModule.protobuf.loadSync(nodejsProtoPath);

    this.operationsClient = gaxModule
      .lro({
        auth: this.auth,
        grpc: 'grpc' in gaxGrpc ? gaxGrpc.grpc : undefined,
      })
      .operationsClient(opts);
    const createWorkflowResponse = protoFilesRoot.lookup(
      '.google.cloud.workflows.v1alpha1.Workflow'
    ) as gax.protobuf.Type;
    const createWorkflowMetadata = protoFilesRoot.lookup(
      '.google.cloud.workflows.v1alpha1.OperationMetadata'
    ) as gax.protobuf.Type;
    const deleteWorkflowResponse = protoFilesRoot.lookup(
      '.google.protobuf.Empty'
    ) as gax.protobuf.Type;
    const deleteWorkflowMetadata = protoFilesRoot.lookup(
      '.google.cloud.workflows.v1alpha1.OperationMetadata'
    ) as gax.protobuf.Type;
    const updateWorkflowResponse = protoFilesRoot.lookup(
      '.google.cloud.workflows.v1alpha1.Workflow'
    ) as gax.protobuf.Type;
    const updateWorkflowMetadata = protoFilesRoot.lookup(
      '.google.cloud.workflows.v1alpha1.OperationMetadata'
    ) as gax.protobuf.Type;

    this._descriptors.longrunning = {
      createWorkflow: new gaxModule.LongrunningDescriptor(
        this.operationsClient,
        createWorkflowResponse.decode.bind(createWorkflowResponse),
        createWorkflowMetadata.decode.bind(createWorkflowMetadata)
      ),
      deleteWorkflow: new gaxModule.LongrunningDescriptor(
        this.operationsClient,
        deleteWorkflowResponse.decode.bind(deleteWorkflowResponse),
        deleteWorkflowMetadata.decode.bind(deleteWorkflowMetadata)
      ),
      updateWorkflow: new gaxModule.LongrunningDescriptor(
        this.operationsClient,
        updateWorkflowResponse.decode.bind(updateWorkflowResponse),
        updateWorkflowMetadata.decode.bind(updateWorkflowMetadata)
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.workflows.v1alpha1.Workflows',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.workflows.v1alpha1.Workflows.
    this.workflowsStub = gaxGrpc.createStub(
      opts.fallback
        ? (protos as protobuf.Root).lookupService(
            'google.cloud.workflows.v1alpha1.Workflows'
          )
        : // tslint:disable-next-line no-any
          (protos as any).google.cloud.workflows.v1alpha1.Workflows,
      opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const workflowsStubMethods = [
      'listWorkflows',
      'getWorkflow',
      'createWorkflow',
      'deleteWorkflow',
      'updateWorkflow',
    ];

    for (const methodName of workflowsStubMethods) {
      const innerCallPromise = this.workflowsStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'workflows.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'workflows.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  getWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IGetWorkflowRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
      (
        | protosTypes.google.cloud.workflows.v1alpha1.IGetWorkflowRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  getWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IGetWorkflowRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
      | protosTypes.google.cloud.workflows.v1alpha1.IGetWorkflowRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Gets details of a single Workflow.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. Name of the workflow which information should be
   *   retrieved, for example,
   *   "projects/project1/locations/us-central1/workflows/workflow1".
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Workflow]{@link google.cloud.workflows.v1alpha1.Workflow}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IGetWorkflowRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
          | protosTypes.google.cloud.workflows.v1alpha1.IGetWorkflowRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
      | protosTypes.google.cloud.workflows.v1alpha1.IGetWorkflowRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
      (
        | protosTypes.google.cloud.workflows.v1alpha1.IGetWorkflowRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.getWorkflow(request, options, callback);
  }

  createWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.ICreateWorkflowRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  createWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.ICreateWorkflowRequest,
    options: gax.CallOptions,
    callback: Callback<
      LROperation<
        protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Creates a new workflow. If a workflow with the specified name already
   * exists in the specified project and location, the long running operation
   * will return `ALREADY_EXISTS` error.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. Project and location in which the workflow should be created, for
   *   example "projects/project1/locations/us-central1".
   * @param {google.cloud.workflows.v1alpha1.Workflow} request.workflow
   *   Required. Workflow to be created.
   * @param {string} request.workflowId
   *   Required. The ID of the workflow to be created. It has to fulfil the
   *   following requirements:
   *
   *   * Must contain only letters, numbers, underscores and hyphens.
   *   * Must start with a letter.
   *   * Must be between 1-64 characters.
   *   * Must end with a number or a letter.
   *   * Must be unique within the customer project / location.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  createWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.ICreateWorkflowRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          LROperation<
            protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
            protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
          >,
          protosTypes.google.longrunning.IOperation | undefined,
          {} | undefined
        >,
    callback?: Callback<
      LROperation<
        protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.createWorkflow(request, options, callback);
  }
  deleteWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IDeleteWorkflowRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      LROperation<
        protosTypes.google.protobuf.IEmpty,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  deleteWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IDeleteWorkflowRequest,
    options: gax.CallOptions,
    callback: Callback<
      LROperation<
        protosTypes.google.protobuf.IEmpty,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Deletes a workflow with the specified name.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. Name of the workflow which should be deleted, for example,
   *   "projects/project1/locations/us-central1/workflows/workflow1".
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  deleteWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IDeleteWorkflowRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          LROperation<
            protosTypes.google.protobuf.IEmpty,
            protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
          >,
          protosTypes.google.longrunning.IOperation | undefined,
          {} | undefined
        >,
    callback?: Callback<
      LROperation<
        protosTypes.google.protobuf.IEmpty,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): Promise<
    [
      LROperation<
        protosTypes.google.protobuf.IEmpty,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.deleteWorkflow(request, options, callback);
  }
  updateWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IUpdateWorkflowRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  updateWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IUpdateWorkflowRequest,
    options: gax.CallOptions,
    callback: Callback<
      LROperation<
        protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Updates existing workflow and increases its
   * [version_id][google.cloud.workflows.v1alpha1.Workflow.version_id].
   * Has no impact on any workflow execution.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.workflows.v1alpha1.Workflow} request.workflow
   *   Required. Workflow to be updated.
   * @param {google.protobuf.FieldMask} request.updateMask
   *   List of the only fields to be updated. If not present, the entire workflow
   *   will be updated.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  updateWorkflow(
    request: protosTypes.google.cloud.workflows.v1alpha1.IUpdateWorkflowRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          LROperation<
            protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
            protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
          >,
          protosTypes.google.longrunning.IOperation | undefined,
          {} | undefined
        >,
    callback?: Callback<
      LROperation<
        protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.workflows.v1alpha1.IWorkflow,
        protosTypes.google.cloud.workflows.v1alpha1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      workflow_name: request.workflow!.name || '',
    });
    return this._innerApiCalls.updateWorkflow(request, options, callback);
  }
  listWorkflows(
    request: protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.workflows.v1alpha1.IWorkflow[],
      protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest | null,
      protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsResponse
    ]
  >;
  listWorkflows(
    request: protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.workflows.v1alpha1.IWorkflow[],
      protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest | null,
      protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsResponse
    >
  ): void;
  /**
   * Lists Workflows in a given project and location.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. Project and location from which the workflows should be listed,
   *   for example, "projects/project1/locations/us-central1".
   * @param {number} request.pageSize
   *   Maximum number of workflows to return per call.
   * @param {string} request.pageToken
   *   The value returned by the last
   *   `ListWorkflowsResponse` indicates that
   *   this is a continuation of a prior `ListWorkflows` call, and that the
   *   system should return the next page of data.
   * @param {string} request.filter
   * @param {string} request.orderBy
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [Workflow]{@link google.cloud.workflows.v1alpha1.Workflow}.
   *   The client library support auto-pagination by default: it will call the API as many
   *   times as needed and will merge results from all the pages into this array.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [Workflow]{@link google.cloud.workflows.v1alpha1.Workflow} that corresponds to
   *   the one page received from the API server.
   *   If the second element is not null it contains the request object of type [ListWorkflowsRequest]{@link google.cloud.workflows.v1alpha1.ListWorkflowsRequest}
   *   that can be used to obtain the next page of the results.
   *   If it is null, the next page does not exist.
   *   The third element contains the raw response received from the API server. Its type is
   *   [ListWorkflowsResponse]{@link google.cloud.workflows.v1alpha1.ListWorkflowsResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listWorkflows(
    request: protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.workflows.v1alpha1.IWorkflow[],
          protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest | null,
          protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsResponse
        >,
    callback?: Callback<
      protosTypes.google.cloud.workflows.v1alpha1.IWorkflow[],
      protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest | null,
      protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsResponse
    >
  ): Promise<
    [
      protosTypes.google.cloud.workflows.v1alpha1.IWorkflow[],
      protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest | null,
      protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsResponse
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.listWorkflows(request, options, callback);
  }

  /**
   * Equivalent to {@link listWorkflows}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listWorkflows} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. Project and location from which the workflows should be listed,
   *   for example, "projects/project1/locations/us-central1".
   * @param {number} request.pageSize
   *   Maximum number of workflows to return per call.
   * @param {string} request.pageToken
   *   The value returned by the last
   *   `ListWorkflowsResponse` indicates that
   *   this is a continuation of a prior `ListWorkflows` call, and that the
   *   system should return the next page of data.
   * @param {string} request.filter
   * @param {string} request.orderBy
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which emits an object representing [Workflow]{@link google.cloud.workflows.v1alpha1.Workflow} on 'data' event.
   */
  listWorkflowsStream(
    request?: protosTypes.google.cloud.workflows.v1alpha1.IListWorkflowsRequest,
    options?: gax.CallOptions | {}
  ): Transform {
    request = request || {};
    const callSettings = new gax.CallSettings(options);
    return this._descriptors.page.listWorkflows.createStream(
      this._innerApiCalls.listWorkflows as gax.GaxCall,
      request,
      callSettings
    );
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified workflow resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} workflow
   * @returns {string} Resource name string.
   */
  workflowPath(project: string, location: string, workflow: string) {
    return this._pathTemplates.workflowPathTemplate.render({
      project,
      location,
      workflow,
    });
  }

  /**
   * Parse the project from Workflow resource.
   *
   * @param {string} workflowName
   *   A fully-qualified path representing Workflow resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromWorkflowName(workflowName: string) {
    return this._pathTemplates.workflowPathTemplate.match(workflowName).project;
  }

  /**
   * Parse the location from Workflow resource.
   *
   * @param {string} workflowName
   *   A fully-qualified path representing Workflow resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromWorkflowName(workflowName: string) {
    return this._pathTemplates.workflowPathTemplate.match(workflowName)
      .location;
  }

  /**
   * Parse the workflow from Workflow resource.
   *
   * @param {string} workflowName
   *   A fully-qualified path representing Workflow resource.
   * @returns {string} A string representing the workflow.
   */
  matchWorkflowFromWorkflowName(workflowName: string) {
    return this._pathTemplates.workflowPathTemplate.match(workflowName)
      .workflow;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    if (!this._terminated) {
      return this.workflowsStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
