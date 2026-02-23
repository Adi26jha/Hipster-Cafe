import { createClient } from '@supabase/supabase-js';

// Replace these with your actual values from the Supabase Dashboard
const supabaseUrl = 'https://wqbcltsozkvqziexrxrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxYmNsdHNvemt2cXppZXhyeHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDc0NTIsImV4cCI6MjA4MzM4MzQ1Mn0.3xHJwzERKBKhD5fZy72zBQvkZW3JXeJD4tJyhNzKH_g';

export const supabase = createClient(supabaseUrl, supabaseKey);