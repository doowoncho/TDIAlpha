import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerFiles = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Files, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly photo_name?: string | null;
  readonly photo_file?: string | null;
  readonly permit_name?: string | null;
  readonly permit_file?: string | null;
  readonly permit_confirmation_name?: string | null;
  readonly permit_confirmation_file?: string | null;
  readonly map_drawing_name?: string | null;
  readonly map_file?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFiles = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Files, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly photo_name?: string | null;
  readonly photo_file?: string | null;
  readonly permit_name?: string | null;
  readonly permit_file?: string | null;
  readonly permit_confirmation_name?: string | null;
  readonly permit_confirmation_file?: string | null;
  readonly map_drawing_name?: string | null;
  readonly map_file?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Files = LazyLoading extends LazyLoadingDisabled ? EagerFiles : LazyFiles

export declare const Files: (new (init: ModelInit<Files>) => Files) & {
  copyOf(source: Files, mutator: (draft: MutableModel<Files>) => MutableModel<Files> | void): Files;
}

type EagerTasks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tasks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly job_id?: string | null;
  readonly setup?: string | null;
  readonly notes?: string | null;
  readonly assigned?: string | null;
  readonly endtime?: string | null;
  readonly starttime?: string | null;
  readonly customer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTasks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tasks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly job_id?: string | null;
  readonly setup?: string | null;
  readonly notes?: string | null;
  readonly assigned?: string | null;
  readonly endtime?: string | null;
  readonly starttime?: string | null;
  readonly customer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Tasks = LazyLoading extends LazyLoadingDisabled ? EagerTasks : LazyTasks

export declare const Tasks: (new (init: ModelInit<Tasks>) => Tasks) & {
  copyOf(source: Tasks, mutator: (draft: MutableModel<Tasks>) => MutableModel<Tasks> | void): Tasks;
}

type EagerJobs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Jobs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly status?: string | null;
  readonly customer?: string | null;
  readonly endtime?: string | null;
  readonly starttime?: string | null;
  readonly wo_number?: string | null;
  readonly permit_number?: string | null;
  readonly permit?: string | null;
  readonly po_number?: string | null;
  readonly map?: string | null;
  readonly photo?: string | null;
  readonly p_confirm?: string | null;
  readonly phone_number?: string | null;
  readonly npat?: boolean | null;
  readonly setup?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJobs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Jobs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly status?: string | null;
  readonly customer?: string | null;
  readonly endtime?: string | null;
  readonly starttime?: string | null;
  readonly wo_number?: string | null;
  readonly permit_number?: string | null;
  readonly permit?: string | null;
  readonly po_number?: string | null;
  readonly map?: string | null;
  readonly photo?: string | null;
  readonly p_confirm?: string | null;
  readonly phone_number?: string | null;
  readonly npat?: boolean | null;
  readonly setup?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Jobs = LazyLoading extends LazyLoadingDisabled ? EagerJobs : LazyJobs

export declare const Jobs: (new (init: ModelInit<Jobs>) => Jobs) & {
  copyOf(source: Jobs, mutator: (draft: MutableModel<Jobs>) => MutableModel<Jobs> | void): Jobs;
}