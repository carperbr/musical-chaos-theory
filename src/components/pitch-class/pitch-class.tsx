import React, { useState, useRef } from "react";
import { Overlay, Dropdown, DropdownButton, Popover } from "react-bootstrap";
import "./pitch-class.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleArrowLeft,
  faCircleArrowDown,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { NOTES } from "../../utils";

export interface PitchClassProps {
  notes: string[];
  note: string;
  idx: number;
  x: number;
  y: number;
  selected: boolean;
  handleNoteChange: (idx: number, note: string) => void;
  handleNoteRemoved: (idx: number) => void;
  handleNoteAdded: (idx: number, side: number, note: string) => void;
}

export const PitchClass = (props: PitchClassProps) => {
  const [show, setShow] = useState(false);
  const [insertNote, setInsertNote] = useState(props.note);
  const target = useRef<SVGTextElement>(null);
  const popover = useRef<HTMLDivElement>(null);
  const { note, x, y } = props;

  const handleClickOutisde = (event: MouseEvent) => {
    if (popover.current && !popover.current.contains(event.target as Node)) {
      setShow(false);
      document.removeEventListener("mousedown", handleClickOutisde);
    }
  };

  const handleClick = () => {
    if (!show) {
      setInsertNote(props.note);
      setShow(true);
      document.addEventListener("mousedown", handleClickOutisde);
    }
  };

  const handleNoteChange = (idx: number, note: string) => {
    props.handleNoteChange(props.idx, note);
    setShow(false);
  };

  const handleNoteRemoved = (idx: number) => {
    props.handleNoteRemoved(idx);
    setShow(false);
  };

  const handleNoteAdded = (idx: number, side: number, note: string) => {
    props.handleNoteAdded(idx, side, note);
    setShow(false);
  };

  return (
    <>
      <text
        className={props.selected ? "pitch-class selected" : "pitch-class"}
        x={x}
        y={y}
        textAnchor="middle"
        alignmentBaseline="central"
        ref={target}
        onClick={() => handleClick()}
      >
        {note}
      </text>

      <Overlay target={target.current} show={show} placement="bottom">
        <Popover>
          <Popover.Header as="h3">Change Note</Popover.Header>
          <Popover.Body ref={popover}>
            <div style={{ display: "flex" }}>
              <DropdownButton title={insertNote} variant="Primary">
                {NOTES.map((n, idx) => (
                  <Dropdown.Item
                    eventKey={idx}
                    active={n === insertNote}
                    onClick={() => setInsertNote(n)}
                  >
                    {n}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <FontAwesomeIcon
                className="trash-icon"
                icon={faCircleArrowDown}
                onClick={() => handleNoteChange(props.idx, insertNote)}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="trash-icon"
                icon={faCircleArrowLeft}
                onClick={() => handleNoteAdded(props.idx, 0, insertNote)}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="trash-icon"
                icon={faCircleArrowRight}
                onClick={() => handleNoteAdded(props.idx + 1, 0, insertNote)}
              ></FontAwesomeIcon>
              {props.notes.length > 1 && (
                <FontAwesomeIcon
                  className="trash-icon"
                  icon={faTrash}
                  onClick={() => handleNoteRemoved(props.idx)}
                ></FontAwesomeIcon>
              )}
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};
