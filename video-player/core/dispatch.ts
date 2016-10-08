import {Action} from 'redux';

/**
 * We don't need Dispatch to depend on State's type so we don't use type from Redux directly
 */
export interface Dispatch {
    <A extends Action>(action: A): A;
}
