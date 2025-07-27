import { Button } from "../button";

const PrevNextButton = ({
  showPrevButton = true,
  onClickPrev,
  disabled = false,
  submitting = false,
  nextBtnTitle = "Next",
  prevBtnTitle = "Previous",
}: {
  showPrevButton?: boolean;
  onClickPrev?: () => void;
  isEndOfForm?: boolean;
  disabled?: boolean;
  submitting?: boolean;
  nextBtnTitle?: string;
  prevBtnTitle?: string;
}) => {
  return (
    <div
      className={`mt-2 flex justify-end ${showPrevButton ? "gap-4 h-fit" : ""}`}
    >
      {showPrevButton && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            onClickPrev?.();
          }}
          variant="neutral"
          disabled={submitting}
        >
          {prevBtnTitle}
        </Button>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={disabled}
        submitting={submitting}
      >
        {nextBtnTitle}
      </Button>
    </div>
  );
};

export default PrevNextButton;
