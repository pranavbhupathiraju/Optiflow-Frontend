/*
  # Sample Data for Development

  This migration adds sample data to demonstrate the dashboard functionality.
  This should only be used in development environments.
*/

-- Insert sample services (these would normally be created by admin/sales team)
INSERT INTO services (user_id, service_name, service_type, status, monthly_cost, start_date, description) VALUES
  -- These will be linked to actual users when they sign up
  ('00000000-0000-0000-0000-000000000000', 'AI Content Generation', 'ai-content', 'active', 2500.00, '2024-01-15', 'Automated blog posts, social media content, and marketing copy generation'),
  ('00000000-0000-0000-0000-000000000000', 'Website Performance Optimization', 'website-optimization', 'active', 1800.00, '2024-02-01', 'Complete website speed optimization and SEO improvements'),
  ('00000000-0000-0000-0000-000000000000', 'AI Customer Support Chatbot', 'ai-chatbots', 'pending', 1200.00, '2024-03-01', '24/7 intelligent customer support automation'),
  ('00000000-0000-0000-0000-000000000000', 'Custom CRM Integration', 'technical-solutions', 'active', 3500.00, '2024-01-01', 'Custom Salesforce integration with AI lead scoring')
ON CONFLICT DO NOTHING;

-- Insert sample billing records
INSERT INTO billing (user_id, amount, status, due_date, invoice_date, description) VALUES
  ('00000000-0000-0000-0000-000000000000', 2500.00, 'paid', '2024-02-15', '2024-01-15', 'AI Content Generation - February 2024'),
  ('00000000-0000-0000-0000-000000000000', 1800.00, 'paid', '2024-03-01', '2024-02-01', 'Website Optimization - March 2024'),
  ('00000000-0000-0000-0000-000000000000', 3500.00, 'pending', '2024-03-15', '2024-02-15', 'Custom CRM Integration - March 2024'),
  ('00000000-0000-0000-0000-000000000000', 2500.00, 'pending', '2024-04-15', '2024-03-15', 'AI Content Generation - April 2024'),
  ('00000000-0000-0000-0000-000000000000', 1200.00, 'overdue', '2024-03-01', '2024-02-01', 'AI Chatbot Setup - March 2024')
ON CONFLICT DO NOTHING;

-- Function to assign sample data to new users (for demo purposes)
CREATE OR REPLACE FUNCTION assign_sample_data_to_user(user_id uuid)
RETURNS void AS $$
BEGIN
  -- Update sample services to belong to the new user
  UPDATE services 
  SET user_id = assign_sample_data_to_user.user_id 
  WHERE user_id = '00000000-0000-0000-0000-000000000000'
  AND NOT EXISTS (
    SELECT 1 FROM services WHERE services.user_id = assign_sample_data_to_user.user_id
  );
  
  -- Update sample billing to belong to the new user
  UPDATE billing 
  SET user_id = assign_sample_data_to_user.user_id 
  WHERE user_id = '00000000-0000-0000-0000-000000000000'
  AND NOT EXISTS (
    SELECT 1 FROM billing WHERE billing.user_id = assign_sample_data_to_user.user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the handle_new_user function to include sample data assignment
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
  );
  
  -- Assign sample data for demo purposes
  PERFORM assign_sample_data_to_user(NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;