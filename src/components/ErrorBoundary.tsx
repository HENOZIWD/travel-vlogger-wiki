import { Component, type ComponentType, type ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';
import { isHTTPError } from 'ky';
import { v4 as uuidv4 } from 'uuid';
import { reportBug } from '../apis/reportBug';

interface FallbackProps {
  error: Error;
  reset: () => void;
}

interface Props {
  children?: ReactNode;
  FallbackComponent?: ComponentType<FallbackProps>;
}

type State = {
  hasError: false;
  error: null;
  errorId: null;
} | {
  hasError: true;
  error: Error;
  errorId: string;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: uuidv4(),
    };
  }

  componentDidCatch(error: Error) {
    if (!isHTTPError(error)) {
      const { errorId } = this.state;

      if (errorId) {
        reportBug({
          id: errorId,
          info: error instanceof Error
            ? error.stack ?? `${error.name}: ${error.message}`
            : String(error),
        });
      }
    }
  }

  reset = () => { // lexical binding
    this.setState({
      hasError: false,
      error: null,
      errorId: null,
    });
  };

  render() {
    const { reset } = this;
    const { hasError, error, errorId } = this.state;
    const { children, FallbackComponent } = this.props;

    if (hasError) {
      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={error}
            reset={reset}
          />
        );
      }

      return (
        <ErrorFallback
          error={error}
          reset={reset}
          errorId={errorId}
        />
      );
    }

    return children;
  }
}
