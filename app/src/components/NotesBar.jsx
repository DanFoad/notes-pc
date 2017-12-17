import React, {Component} from 'react'
import {connect} from 'react-redux'

import AppActions from '../actions/AppActions'

import SearchBar from './SearchBar.jsx'
import NoteSort from './NoteSort.jsx'

class NotesBar extends Component {

    constructor(props) {
        super(props);

        this.state = { selectedTag: props.selectedTag, selectedNote: props.selectedNote, tags: props.tags, notes: props.notes }

        this.getNoteSummaries = this.getNoteSummaries.bind(this);
        this.getTaggedNotes = this.getTaggedNotes.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            selectedTag: nextProps.selectedTag,
            tags: nextProps.tags,
            notes: nextProps.notes,
            selectedNote: nextProps.selectedNote,
        })
    }

    getTaggedNotes() {
        const notes = [ ...this.state.notes ]
        if (this.state.selectedTag == -1) return notes
        return notes.filter((notes) => notes.tag == this.state.selectedTag)
    }

    setSelectedNote(id) {
        AppActions.setSelectedNote(id)
    }

    getNoteSummaries() {
        var taggedNotes = this.getTaggedNotes()

        var notesummaries = []

        for (var i = 0; i < taggedNotes.length; i++) {
            var clickHandler = this.setSelectedNote.bind(this, taggedNotes[i].id)

            notesummaries.push(
            <div key={taggedNotes[i].id} className={'notesummary' + (taggedNotes[i].id == this.state.selectedNote ? ' selected' : '')}
                onClick={ clickHandler }>
                <h3>{taggedNotes[i].name}</h3>
                <p>{taggedNotes[i].shortText}</p>
                <span className='notesummary__date'>{new Date(taggedNotes[i].date).toLocaleString("en-GB")}</span>
            </div>)
        }

        return (
            <div className='notesummaries'>
                { notesummaries }
            </div>
        );
    }

    render () {
        return (
            <div className='notesbar'>
                <h2>business notes<span className='icon__button'>+</span></h2>
                <SearchBar />
                <NoteSort />
                { this.getNoteSummaries() }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        selectedTag: state.selectedTag,
        tags: state.tags,
        notes: state.notes,
        selectedNote: state.selectedNote,
    }
}
export default connect(mapStateToProps)(NotesBar);