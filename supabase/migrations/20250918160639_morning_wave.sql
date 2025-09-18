```sql
-- Drop the existing function to allow recreation with modifications
-- CASCADE ensures any dependent objects (like triggers) are handled appropriately.
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Function to handle user profile creation and update on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, company_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company_name',
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    company_name = EXCLUDED.company_name,
    phone = EXCLUDED.phone,
    updated_at = now();
  
  -- Assign sample data for demo purposes (if applicable)
  -- This function call assumes assign_sample_data_to_user exists and is relevant.
  -- If you haven't run the sample data migration, you might want to remove this line.
  PERFORM assign_sample_data_to_user(NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The trigger 'on_auth_user_created' will automatically use the updated 'handle_new_user' function
-- because we used CREATE OR REPLACE FUNCTION. No need to recreate the trigger explicitly.
```