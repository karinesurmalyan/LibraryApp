export const bookStyles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'flex-start',
        gap: '16px',
        padding: '20px'
    },

    card: {
        width: 'calc(33.333% - 16px)',
        minWidth: '280px',
        margin: '0'
    },

    cardBody: {
        padding: '16px'
    },

    coverPlaceholder: {
        height: '200px',
        background: '#f0f2f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        margin: 0,
        fontSize: '16px'
    },

    author: {
        fontSize: '14px'
    },

    rate: {
        fontSize: '14px'
    },

    description: {
        margin: 0,
        fontSize: '13px',
        color: '#666'
    }
};