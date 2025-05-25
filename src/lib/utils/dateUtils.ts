export function formatDate(dateString: string): string {
    // Extract just the date part (YYYY-MM-DD) from the UTC datetime string
    if (!dateString) return '';
    
    let dateOnly = dateString;
    
    // If it contains 'T', split and take the date part
    if (dateString.includes('T')) {
        dateOnly = dateString.split('T')[0];
    }
    
    // If it contains a space (like "2025-05-26 00:00:00.000Z"), split on space
    if (dateString.includes(' ')) {
        dateOnly = dateString.split(' ')[0];
    }
    
    // Parse the date and format it as "Month Day, Year"
    const date = new Date(dateOnly + 'T00:00:00'); // Add time to avoid timezone issues
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
} 