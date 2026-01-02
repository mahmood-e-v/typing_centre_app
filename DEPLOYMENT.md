# 🚀 DEPLOYMENT CHECKLIST

## Pre-Deployment (CRITICAL - DO FIRST!)

### 1. ✅ Backup Database
```powershell
# For PostgreSQL
pg_dump -h your-host -U your-user -d your-database > backup_$(Get-Date -Format "yyyyMMdd_HHmmss").sql

# Verify backup file exists and has content
```

### 2. ✅ Environment Variables
Add to `.env`:
```env
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
```

**Generate a secure secret**:
```powershell
# PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

## Deployment Steps

### Step 1: Generate Prisma Client
```powershell
npx prisma generate
```
✅ Expected: "Generated Prisma Client"

### Step 2: Create Migration
```powershell
npx prisma migrate dev --name add_rbac_and_security_enhancements
```
✅ Expected: Migration files created in `prisma/migrations/`

**⚠️ IMPORTANT**: Review the migration SQL before applying!

### Step 3: Run Seed Data
```powershell
npx ts-node prisma/seed.ts
```
✅ Expected output:
- Created 67 permissions
- Created 7 roles
- Created default company and branch
- Created admin user
- Warning about forced password change

### Step 4: Verify Database
```powershell
npx prisma studio
```

Check:
- [ ] Company table has 1 record
- [ ] Branch table has 1 record
- [ ] Role table has 7 records
- [ ] Permission table has 67 records
- [ ] User table has 1 admin user
- [ ] Admin user has `forcePasswordChange: true`

### Step 5: Test Login
1. Start dev server: `npm run dev`
2. Navigate to `/login`
3. Login with:
   - Email: `admin@typingcentre.ae`
   - Password: `admin123`
4. ✅ Should redirect to dashboard
5. ⚠️ Should show "Change Password" prompt

### Step 6: Change Admin Password
1. Navigate to user settings or create `/change-password` page
2. Change from `admin123` to a strong password
3. Verify `forcePasswordChange` is set to `false`

## Post-Deployment Tasks

### Immediate (Day 1)

- [ ] Change admin password
- [ ] Create user accounts for all staff
- [ ] Assign appropriate roles to users
- [ ] Test login with different user roles
- [ ] Verify branch isolation works
- [ ] Test permission restrictions

### Week 1

- [ ] Update existing API routes with permission checks (see `RBAC_EXAMPLES.md`)
- [ ] Add audit logging to sensitive operations
- [ ] Test approval workflows
- [ ] Review audit logs
- [ ] Set up financial period locking

### Week 2

- [ ] Implement forced approval for invoice deletes
- [ ] Add reason validation to frontend
- [ ] Test session hijack protection
- [ ] Configure period lock dates
- [ ] Train staff on new permission system

## Rollback Plan

If something goes wrong:

```powershell
# Restore from backup
psql -h your-host -U your-user -d your-database < backup_YYYYMMDD_HHMMSS.sql

# Reset Prisma
npx prisma migrate reset
```

## Troubleshooting

### Migration Fails
**Error**: "Column already exists"
**Solution**: Check if migration was partially applied. Manually fix conflicts or restore backup.

### Seed Fails
**Error**: "Unique constraint violation"
**Solution**: Seed was already run. Skip or manually delete existing data.

### Can't Login
**Error**: "Invalid credentials"
**Check**:
1. User exists in database
2. Password is correct (`admin123` by default)
3. User has `isActive: true`
4. User has at least one role assigned

### Permission Denied
**Error**: "Forbidden - Insufficient permissions"
**Check**:
1. User has correct role assigned
2. Role has required permission
3. Permission exists in database

## Production Deployment

### Additional Steps for Production

1. **Use Strong JWT Secret**
   ```env
   JWT_SECRET=<64-character-random-string>
   ```

2. **Enable HTTPS**
   - Update `secure` cookie flag in `auth.ts`
   - Configure SSL certificate

3. **Set Up Monitoring**
   - Monitor failed login attempts
   - Alert on session hijack detections
   - Track audit log volume

4. **Configure Backups**
   - Automated daily backups
   - Test restore procedure
   - Store backups securely

5. **Rate Limiting**
   - Add global API rate limiting
   - Configure per-IP limits

6. **Review Security**
   - Audit all permissions
   - Review role assignments
   - Test with penetration testing

## Success Criteria

✅ All migrations applied successfully
✅ Seed data created (67 permissions, 7 roles)
✅ Admin can login
✅ Admin forced to change password
✅ Different roles have different permissions
✅ Branch isolation working
✅ Audit logs being created
✅ No errors in console

## Support

If you encounter issues:
1. Check `MIGRATION_GUIDE.md` for detailed instructions
2. Review `SECURITY_ENHANCEMENTS.md` for new features
3. See `RBAC_EXAMPLES.md` for API update examples
4. Check audit logs for detailed error information

---

**Status**: Ready to deploy! 🚀
**Estimated Time**: 15-30 minutes
**Risk Level**: Medium (database changes)
**Rollback Time**: 5 minutes (with backup)
