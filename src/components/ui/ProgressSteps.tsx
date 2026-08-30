import { CALCULATOR_STEPS } from '../../data/calculatorConfig';
import './ProgressSteps.css';

interface ProgressStepsProps {
  current: number;
}

export function ProgressSteps({ current }: ProgressStepsProps) {
  return (
    <div className="progress-steps" role="navigation" aria-label="Celebration builder progress">
      <ol className="progress-list">
        {CALCULATOR_STEPS.map((step) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <li
              key={step.id}
              className={`progress-item ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}`}
              aria-current={active ? 'step' : undefined}
            >
              <span className="progress-num">{String(step.id).padStart(2, '0')}</span>
              <span className="progress-label">{step.label}</span>
            </li>
          );
        })}
      </ol>
      <div className="progress-bar" aria-hidden>
        <div
          className="progress-fill"
          style={{ width: `${((current - 1) / (CALCULATOR_STEPS.length - 1)) * 100}%` }}
        />
      </div>
      <p className="progress-mobile">
        Step {String(current).padStart(2, '0')} of {String(CALCULATOR_STEPS.length).padStart(2, '0')} —{' '}
        {CALCULATOR_STEPS[current - 1]?.label}
      </p>
    </div>
  );
}
