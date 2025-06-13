import { useState, useMemo } from "react";
export type View<VM, Event> = {
  render(vm: VM | undefined): void;
  onAction(event: Event): void;
};
export const useController = <State, Controller, Event>(
  makeController: (view: View<State, Event>) => Controller,
  cb: (event: Event) => void
) => {
  const [state, setState] = useState<State>();
  const controller = useMemo(
    () => makeController({ render: setState, onAction: cb }),
    []
  );
  return [state, controller] as const;
};
