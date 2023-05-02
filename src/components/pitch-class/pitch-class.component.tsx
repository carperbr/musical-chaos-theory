import React, { Component } from 'react';
import './pitch-class.scss'

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'] as const;
type Note = typeof notes[number];


export interface PitchClassProps {
    note: Note;
    idx: number;
    x: number;
    y: number;
    selected: boolean;
    onClick: (idx: number) => void
}

export const PitchClass = (props: PitchClassProps) => {
    const handleClick = () => {
        props.onClick(props.idx)
    };

    const { note, x, y } = props;

    return (
        <text 
            className={props.selected ? 'pitch-class selected' : 'pitch-class'}
            x={x} 
            y={y}
            textAnchor="middle" 
            alignmentBaseline='central' 
            onClick={() => handleClick()}>
            {note}
        </text>
    )
}