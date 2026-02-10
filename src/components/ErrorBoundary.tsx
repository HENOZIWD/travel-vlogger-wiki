import { Component, type ComponentType, type ErrorInfo, type ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

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
} | {
  hasError: true;
  error: Error;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // log
  }

  reset = () => { // lexical binding
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    const { reset } = this;
    const { hasError, error } = this.state;
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
        />
      );
    }

    return children;
  }
}
